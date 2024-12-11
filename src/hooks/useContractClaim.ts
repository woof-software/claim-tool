import type { Claim } from '@/app/api/claims/route';
import { getPublicClientForChain } from '@/lib/getPublicClientForChain';
import { useMutation } from '@tanstack/react-query';
import { parse as uuidParse } from 'uuid';
import { parseSignature, toHex } from 'viem';
import { useWalletClient } from 'wagmi';
import { ClaimCampaignsAbi } from '../../config/contracts/abis/ClaimCampaignsAbi';
import { hedgeyContractAddresses } from '../../config/contracts/addresses';

export const useContractClaim = () => {
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationKey: ['contract-claim'],
    mutationFn: async ({
      claim,
    }: {
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

      const { request } = await publicClient.simulateContract({
        address: hedgeyContractAddresses[chainId],
        abi: ClaimCampaignsAbi,
        functionName: 'claim',
        value,
        account: walletClient.account,
        args: [parsedClaimId, claim.proof, BigInt(claim.amount)],
      });
      const txHash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
  });
};

export default useContractClaim;
