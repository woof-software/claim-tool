import type { Claim } from '@/app/api/claims/route';
import { getPublicClientForChain } from '@/lib/getPublicClientForChain';
import { useMutation } from '@tanstack/react-query';
import { parse as uuidParse } from 'uuid';
import { parseSignature, toHex } from 'viem';
import { useWalletClient } from 'wagmi';
import { ClaimCampaignsAbi } from '../../config/contracts/abis/ClaimCampaignsAbi';
import { hedgeyContractAddresses } from '../../config/contracts/addresses';

const getClaimDomain = (name: string, chainId: number) => ({
  name,
  version: '1',
  chainId,
  verifyingContract: hedgeyContractAddresses[chainId],
});

const delegationTypes = {
  Delegation: [
    { name: 'delegatee', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
  ],
} as const;

export const useContractClaimAndDelegate = () => {
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationKey: ['contract-claim-and-delegate'],
    mutationFn: async ({
      delegateeAddress,
      claim,
    }: {
      delegateeAddress?: `0x${string}`;
      claim: Claim;
    }) => {
      if (!claim.proof) {
        throw new Error('Proof is required');
      }

      if (!walletClient) {
        throw new Error('Wallet client is required');
      }

      const chainId = await walletClient.getChainId();
      const address = walletClient.account.address;

      if (!address) {
        throw new Error('Address is required');
      }

      // Get nonce for the currrent address
      const publicClient = getPublicClientForChain(chainId);
      const nonce = await publicClient.readContract({
        address: hedgeyContractAddresses[chainId],
        abi: ClaimCampaignsAbi,
        functionName: 'nonces',
        args: [address],
      });

      // Prepare contract call variables
      const parsedClaimId = toHex(uuidParse(claim.uuid));
      const value = BigInt(claim.claimFee);

      let txHash: `0x${string}` | undefined;
      if (delegateeAddress) {
        // Obtain signature for the delegation according to
        // https://github.com/hedgey-finance/DelegatedTokenClaims/blob/master/test/tests/unlockedDelegatingTests.js#L98
        const expiry =
          BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 60 * 24 * 7);
        const signature = await walletClient.signTypedData({
          domain: getClaimDomain('Claim', chainId),
          types: delegationTypes,
          message: {
            delegatee: delegateeAddress,
            expiry,
            nonce,
          },
          primaryType: 'Delegation',
        });
        const { r, v, s } = parseSignature(signature);
        const delegationSignature = {
          nonce,
          expiry,
          v: Number(v),
          r,
          s,
        };

        const { request } = await publicClient.simulateContract({
          address: hedgeyContractAddresses[chainId],
          abi: ClaimCampaignsAbi,
          functionName: 'claimAndDelegate',
          value,
          account: walletClient.account,
          args: [
            parsedClaimId,
            claim.proof,
            BigInt(claim.amount),
            delegateeAddress,
            delegationSignature,
          ],
        });
        txHash = await walletClient.writeContract(request);
      } else {
        const { request } = await publicClient.simulateContract({
          address: hedgeyContractAddresses[chainId],
          abi: ClaimCampaignsAbi,
          functionName: 'claim',
          value,
          account: walletClient.account,
          args: [parsedClaimId, claim.proof, BigInt(claim.amount)],
        });
        txHash = await walletClient.writeContract(request);
      }

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
  });
};

export default useContractClaimAndDelegate;
