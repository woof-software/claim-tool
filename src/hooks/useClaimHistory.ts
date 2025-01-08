import type { Grant } from '@/context/GrantsContext';
import { getPublicClientForChain } from '@/lib/getPublicClientForChain';
import { useQuery } from '@tanstack/react-query';
import { type ResultOf, graphql } from 'gql.tada';
import { print } from 'graphql';
import { parseEventLogs } from 'viem';
import { TokenAbi } from '../../config/contracts/abis/TokenAbi';
import { hedgeyGraphqlApiEndpoint } from '../../config/contracts/endpoints';
import { FEATURES } from '../../config/features';

const { DELEGATION_ENABLED } = FEATURES;

const query = graphql(`
    query GetClaimsForAddress($input: TokenCampaignEventsResolverInput) {
        TokenCampaignEvents(input: $input) {
            events {
                campaign {
                    id
                    product
                    token {
                    address
                    decimals
                    name
                    ticker
                    }
                    type
                }
                campaignId
                chainId
                info {
                    amountClaimed
                    timestamp
                    transactionHash
                }
                network
                nft {
                    currentHolder
                }
                prices {
                    price
                }
            }
        }
    }
`);

export interface ClaimHistoryEvent {
  date: Date;
  claimedAmount: string;
  milestone: string;
  transactionHash: string;
  campaignId: string;
  delegatedTo?: string;
}

export type ClaimHistory = {
  grant: Grant;
  events: ClaimHistoryEvent[];
};

export const useClaimHistory = (
  userAddress: string,
  grants: { grantId: string; chainId: number }[],
) => {
  const grantIds = grants.map((grant) => grant.grantId);
  return useQuery({
    queryKey: ['claim-history', userAddress, grantIds],
    enabled: !!userAddress,
    queryFn: async () => {
      const response = await fetch(hedgeyGraphqlApiEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          query: print(query),
          variables: {
            input: {
              includeTestnets: true,
              address: userAddress,
              eventType: 'TokensClaimed',
            },
          },
        }),
      });
      const result = (await response.json()).data as ResultOf<typeof query>;
      const allEvents = result.TokenCampaignEvents?.events
        ?.map((event) => {
          const date = event?.info?.timestamp
            ? new Date(Number(event.info.timestamp) * 1000)
            : undefined;
          const claimedAmount = event?.info?.amountClaimed;
          // TODO: Get the correct milestone
          const milestone = '1';
          const transactionHash = event?.info?.transactionHash;
          const campaignId = event?.campaign?.id;

          if (!date || !claimedAmount || !transactionHash || !campaignId) {
            return null;
          }

          return {
            date,
            claimedAmount,
            milestone,
            transactionHash,
            campaignId,
          } as ClaimHistoryEvent;
        })
        .filter((event) => !!event)
        // Sort in reverse order by timestamp
        .toSorted((a, b) => b.date.getTime() - a.date.getTime());

      if (!allEvents) {
        return {};
      }

      const eventsPerClaimId = grantIds.reduce(
        (acc, grantId) => {
          const events = allEvents.filter(
            (event) => event.campaignId === grantId,
          );

          if (events.length === 0) {
            return acc;
          }

          acc[grantId] = events;
          return acc;
        },
        {} as Record<string, ClaimHistoryEvent[]>,
      );

      if (!DELEGATION_ENABLED) {
        return eventsPerClaimId;
      }

      const chainsByGrantId = grants.reduce(
        (acc, grant) => {
          acc[grant.grantId] = grant.chainId;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Get the delegateTo address for each claim
      // TODO: Replace with contract call to Token.delegate(address userAddress) contract, once that works
      return await Promise.all(
        Object.entries(eventsPerClaimId).map(async ([campaignId, events]) => {
          if (events.length === 0) {
            return { campaignId, events: [] };
          }

          const chainId = chainsByGrantId[campaignId];
          const publicClient = getPublicClientForChain(chainId);
          const eventsWithDelegateTo = await Promise.all(
            events.map(async (event) => {
              // Get the transaction receipt
              const receipt = await publicClient.getTransactionReceipt({
                hash: event.transactionHash as `0x${string}`,
              });

              // Parse logs and collect the latest DelegateChanged event for the transaction
              const logs = parseEventLogs({
                abi: TokenAbi,
                logs: receipt.logs,
              });
              const delegateChangedLogs = logs.filter(
                (log) => log.eventName === 'DelegateChanged',
              );
              if (delegateChangedLogs.length === 0) {
                return event;
              }
              const lastDelegateChangedLog =
                delegateChangedLogs[delegateChangedLogs.length - 1];

              // Get the address of the delegate
              const delegateTo = lastDelegateChangedLog?.args?.toDelegate;
              return {
                ...event,
                delegatedTo: delegateTo,
              };
            }),
          );
          return {
            campaignId,
            events: eventsWithDelegateTo,
          };
        }),
      ).then((delegates) =>
        delegates.reduce(
          (acc, { campaignId, events }) => {
            if (!events?.length) {
              return acc;
            }

            acc[campaignId] = events;
            return acc;
          },
          {} as Record<string, ClaimHistoryEvent[]>,
        ),
      );
    },
  });
};
