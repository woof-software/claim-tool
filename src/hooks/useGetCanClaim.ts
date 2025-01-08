import type { Claim, ResponseData } from '@/app/api/claims/route';
import { getPublicClientForChain } from '@/lib/getPublicClientForChain';
import { useQuery } from '@tanstack/react-query';
import { parse as uuidParse } from 'uuid';
import { toHex } from 'viem';
import { useAccount } from 'wagmi';
import { ClaimCampaignsAbi } from '../../config/contracts/abis/ClaimCampaignsAbi';
import { hedgeyContractAddresses } from '../../config/contracts/addresses';
import type { HedgeyCampaign } from './useGetHedgeyCampaigns';

export const useGetCanClaim = (campaigns: HedgeyCampaign[]) => {
  const { address } = useAccount();
  const campaignIds = campaigns.map((campaign) => campaign.id);

  return useQuery({
    queryKey: ['proofs', campaignIds, address],
    queryFn: async () => {
      return Promise.all(
        campaigns.map(async (campaign) => {
          if (!campaign.id) {
            return null;
          }
          const response = await fetch(
            `/api/claims?uuid=${campaign.id}&address=${address}`,
          );
          const claim = await response
            .json()
            .then((data) => data.data as Claim);

          if (!claim) {
            return null;
          }

          let claimed = false;
          if (claim.canClaim) {
            // Verify if it was already claimed from the contract
            const publicClient = getPublicClientForChain(campaign.chainId);
            const parsedClaimId = toHex(uuidParse(campaign.id));
            claimed = await publicClient.readContract({
              address: hedgeyContractAddresses[campaign.chainId],
              abi: ClaimCampaignsAbi,
              functionName: 'claimed',
              args: [parsedClaimId, address],
            });
          }

          return {
            ...claim,
            claimed,
          };
        }),
      );
    },
    enabled: !!address,
  });
};
