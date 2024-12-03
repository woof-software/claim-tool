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
  delegateTo: string;
  latestClaim: string;
  claimed: number;
  grantAmount: number;
  canClaim: boolean;
};

type GrantsContextType = {
  grants: Grant[];
  displayedGrants: Grant[];
  loadMore: () => void;
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
  const grants: Grant[] = [
    {
      id: '04725f67-1af7-4b4c-9b3e-7f523f5e8cf7',
      title: 'Uniswap Demo Grant',
      description: 'Claim your tokens here',
      date: new Date('2024-10-01'),
      delegateTo: '0x01',
      latestClaim: '0x00',
      claimed: 138571.8,
      grantAmount: 250000.0,
      canClaim: true,
    },
    {
      id: 'e23db1a6-3a9b-48bf-8a06-bb39c2298435',
      title: 'Demo Grant',
      description: 'Claim your PLBR here',
      date: new Date('2024-10-01'),
      delegateTo: '0x01',
      latestClaim: '0x00',
      claimed: 138571.8,
      grantAmount: 250000.0,
      canClaim: true,
    },
  ];

  const [displayCount, setDisplayCount] = useState(10);

  const loadMore = () => {
    setDisplayCount((prevCount) => Math.min(prevCount + 5, grants.length));
  };

  return (
    <GrantsContext.Provider
      value={{
        grants,
        displayedGrants: grants.slice(0, displayCount),
        loadMore,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};
