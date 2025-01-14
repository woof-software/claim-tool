import type { Claim } from '@/app/api/claims/route';
import type { ClaimHistoryEvent } from '@/hooks/useClaimHistory';
import { useGetGrants, useGetGrants2 } from '@/hooks/useGetGrants';
import type { HedgeyCampaign } from '@/hooks/useGetHedgeyCampaigns';
import type React from 'react';
import { createContext, useContext, useState } from 'react';

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
  const { data, isLoading, isFetched } = useGetGrants2();

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 5, data?.length ?? 0));
  };

  return (
    <GrantsContext.Provider
      value={{
        grants: data ?? [],
        displayedGrants: data?.slice(0, displayCount) ?? [],
        loadMore,
        isLoading,
        isFetched,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};
