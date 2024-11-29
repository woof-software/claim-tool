import type { Claim } from '@/app/api/claims/route';
import { useMutation } from '@tanstack/react-query';
import { parse as uuidParse } from 'uuid';
import { parseSignature, toHex } from 'viem';
import {
  useAccount,
  useReadContract,
  useSignTypedData,
  useWriteContract,
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
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
  const chainId = sepolia.id;
  const { writeContractAsync } = useWriteContract();
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();
  const {
    data: nonce,
    error,
    failureCount,
  } = useReadContract({
    address: hedgeyContractAddresses[chainId],
    abi: ClaimCampaignsAbi,
    functionName: 'nonces',
    args: [address],
    chainId,
    query: { enabled: Boolean(address), retry: false },
  });
  console.log('nonce', nonce, error, failureCount);

  return useMutation({
    mutationKey: ['contract-claim-and-delegate'],
    mutationFn: async ({
      claimId,
      delegateeAddress,
      claim,
    }: {
      delegateeAddress: `0x${string}`;
      claimId: string;
      claim: Claim;
    }) => {
      if (!claim.proof) {
        throw new Error('Proof is required');
      }

      // if (!nonce) {
      //   throw new Error('Nonce is required');
      // }

      // TODO: Obtain the nonce for the current user
      const nonce = BigInt(0);
      console.log('nonce', nonce);

      // Obtain signature for the delegation according to
      // https://github.com/hedgey-finance/DelegatedTokenClaims/blob/master/test/tests/unlockedDelegatingTests.js#L98
      const expiry =
        BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 60 * 24 * 7);
      const signature = await signTypedDataAsync({
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

      // Perform the contract call
      const parsedClaimId = toHex(uuidParse(claimId));

      const claimFee = '223000000000000';
      const value = BigInt(claimFee);

      return await writeContractAsync({
        address: hedgeyContractAddresses[chainId],
        abi: ClaimCampaignsAbi,
        functionName: 'claimAndDelegate',
        chainId,
        value,
        args: [
          parsedClaimId,
          claim.proof,
          BigInt(claim.amount),
          delegateeAddress,
          delegationSignature,
        ],
      });
    },
  });
};

export default useContractClaimAndDelegate;
