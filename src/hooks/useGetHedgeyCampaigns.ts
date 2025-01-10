import { getChainIdByNetworkName } from '@/lib/getPublicClientForChain';
import { useQuery } from '@tanstack/react-query';
import { type ResultOf, graphql } from 'gql.tada';
import { print } from 'graphql';
import { hedgeyGraphqlApiEndpoint } from '../../config/contracts/endpoints';

const query = graphql(`
    query GetGrants($input: CampaignQueryInput) {
      campaigns(query: $input) {
        _id
        claimLockup {
          _id
          cliff
          period
          periods
          start
          tokenLocker
        }
        contractAddress
        createdAt
        delegating
        end
        ended {
          _id
          timestamp
          transactionHash
        }
        from
        id
        manager
        network
        root
        start
        token {
          _id
          address
          decimals
          name
          ticker
        }
        totalAddresses
        totalAmount
        totalAmountClaimed
        totalClaims
        type
        updatedAt
      }
    }
  `);

export type HedgeyCampaign = NonNullable<
  ResultOf<typeof query>['campaigns'][number]
> & { chainId: number };

export const useGetHedgeyCampaigns = (campaignIds: string[]) => {
  return useQuery({
    queryKey: ['get-hedgey-campaigns', campaignIds],
    enabled: campaignIds.length > 0,
    queryFn: async () => {
      const response = await fetch(hedgeyGraphqlApiEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          query: print(query),
          variables: {
            input: {
              id_in: campaignIds,
            },
          },
        }),
      });
      const result = (await response.json()).data as ResultOf<typeof query>;
      return result.campaigns
        .filter((campaign) => campaign !== null)
        .map((campaign) => ({
          ...campaign,
          chainId: getChainIdByNetworkName(campaign.network),
        }));
    },
  });
};
