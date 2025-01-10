import type { Claim } from '@/app/api/claims/route';
import {
  type ClaimHistoryEvent,
  useClaimHistory,
} from '@/hooks/useClaimHistory';
import { useGetCanClaim } from '@/hooks/useGetCanClaim';
import { useGetGrants } from '@/hooks/useGetGrants';
import {
  type HedgeyCampaign,
  useGetHedgeyCampaigns,
} from '@/hooks/useGetHedgeyCampaigns';
import { getNextTokenReleaseTimestamp } from '@/lib/getNextTokenRelease';
import { getChainIdByNetworkName } from '@/lib/getPublicClientForChain';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { getChainConfig } from '../../config/features';

export enum FilterOption {
  Highest = 'Highest',
  Lowest = 'Lowest',
  MostClaimed = 'MostClaimed',
  LeastClaimed = 'LeastClaimed',
}

export type Grant = {
  id: string;
  title: string;
  description: string;
  date: Date;
  delegateTo?: string;
  latestClaimHash: string;
  claimed: number;
  grantAmount: number;
  chainId: number;
  proof: Claim & { claimed: boolean };
  campaign: HedgeyCampaign;
  currentUserCanClaim: boolean;
  claimEvents?: ClaimHistoryEvent[];
  tokenReleasedInDays: number | null;
  projectImage?: string;
};

type GrantsContextType = {
  grants: Grant[];
  displayedGrants: Grant[];
  loadMore: () => void;
  isLoading: boolean;
  isFetched: boolean;
};

const GrantsContext = createContext<GrantsContextType | undefined>(undefined);

export const useGrants = () => {
  const context = useContext(GrantsContext);
  if (context === undefined) {
    throw new Error('useGrants must be used within a GrantsProvider');
  }
  return context;
};

type GrantsProviderProps = {
  children: React.ReactNode;
};

export const GrantsProvider: React.FC<GrantsProviderProps> = ({ children }) => {
  const [displayCount, setDisplayCount] = useState(10);

  const { grants } = useGetGrants();
  const { address } = useAccount();
  const campaignIds = grants.map((grant) => grant.uuid);
  const {
    data: hedgeyCampaigns,
    isLoading: isLoadingHedgeyCampaigns,
    isFetched: isFetchedHedgeyCampaigns,
  } = useGetHedgeyCampaigns(campaignIds);
  const {
    data: proofs,
    isLoading: isLoadingProofs,
    isFetched: isFetchedProofs,
  } = useGetCanClaim(hedgeyCampaigns ?? []);
  const {
    data: claimHistory = {},
    isLoading: isLoadingClaimHistory,
    isFetched: isFetchedClaimHistory,
  } = useClaimHistory(
    address,
    hedgeyCampaigns
      ?.filter((campaign) => !!campaign?.id)
      .map((campaign) => ({
        grantId: campaign.id as string,
        chainId: getChainIdByNetworkName(campaign.network),
      })) || [],
  );

  const isLoading =
    isLoadingHedgeyCampaigns || isLoadingProofs || isLoadingClaimHistory;

  const isFetched =
    isFetchedHedgeyCampaigns && isFetchedProofs && isFetchedClaimHistory;

  const supportedChainIds = getChainConfig().chains.map((chain) => chain.id);

  // Map the Hedgey campaigns to the grants, ignore any grants that don't have a corresponding campaign
  const mappedGrants = grants
    .map((grant) => {
      const campaign = hedgeyCampaigns?.find(
        (campaign) => campaign.id === grant.uuid,
      );
      const proof = proofs?.find((proof) => proof?.uuid === grant.uuid);

      if (!proof || !campaign) return null;

      const grantAmount = Number(
        formatUnits(
          BigInt(campaign.totalAmount || 0),
          campaign.token?.decimals || 0,
        ),
      );

      const claimed = Number(
        formatUnits(
          BigInt(Number(campaign.totalAmountClaimed) || 0),
          campaign.token?.decimals || 0,
        ),
      );

      const currentUserCanClaim = proof.canClaim && !proof.claimed;
      const date = new Date(campaign.createdAt as string);
      const chainId = getChainIdByNetworkName(campaign.network);
      const claimEvents = claimHistory[grant.uuid];
      const latestDelegateTo = claimEvents?.find(
        (x) => !!x.delegatedTo,
      )?.delegatedTo;

      const latestClaimHash = claimEvents?.[0]?.transactionHash;

      const tokenReleasedInDays = getNextTokenReleaseTimestamp(
        campaign.claimLockup,
      )?.daysUntilNextRelease;

      return {
        id: grant.uuid,
        title: grant.title,
        projectImage: grant.projectImage,
        description: grant.description,
        proof,
        campaign,
        claimEvents,

        // Calculated fields
        grantAmount,
        claimed,
        currentUserCanClaim,
        date,
        chainId,
        latestClaimHash,
        tokenReleasedInDays,
        delegateTo: latestDelegateTo,
      } as Grant | null;
    })
    .filter((grant) => grant !== null)
    .filter((grant) => {
      const chainId = getChainIdByNetworkName(grant.campaign.network);
      return supportedChainIds.includes(chainId);
    })
    .toSorted(
      (a, b) => Number(b.currentUserCanClaim) - Number(a.currentUserCanClaim),
    );

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 5, grants.length));
  };

  return (
    <GrantsContext.Provider
      value={{
        grants: mappedGrants,
        displayedGrants: mappedGrants.slice(0, displayCount),
        loadMore,
        isLoading,
        isFetched,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};
