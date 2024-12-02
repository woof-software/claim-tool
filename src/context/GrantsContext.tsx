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
    {
      id: '1',
      title: 'Party Protocol',
      description:
        'The Party Protocol is an open-source protocol for group coordination. It provides flexible and powerful primitives for creating a shared smart contract account governed by a group of people, big or small. Party.app is the flagship UI / app built on top. It allows groups to form a small group wallet, and large on-chain DAO, or anything in-between. Party.app has built-in functionality for crowdfunding, governance, using apps via wallet connect, buying & selling NFTs, trading tokens, chatting, and much more.',
      date: new Date('2024-10-01'),
      delegateTo: '0x01',
      latestClaim: '0x00',
      claimed: 138571.8,
      grantAmount: 250000.0,
      canClaim: false,
    },
    {
      id: '2',
      title: 'Optimism Collective',
      description:
        'The Optimism Collective is a large-scale experiment in digital democratic governance, built to drive rapid and sustainable growth of the Optimism ecosystem.',
      date: new Date('2024-09-15'),
      delegateTo: '0x02',
      latestClaim: '0x01',
      claimed: 75000.0,
      grantAmount: 100000.0,
      canClaim: false,
    },
    {
      id: '3',
      title: 'Velodrome Finance',
      description:
        'Velodrome is a next-generation AMM built on the Optimism network, designed to maximize capital efficiency and provide sustainable rewards for liquidity providers.',
      date: new Date('2024-11-30'),
      delegateTo: '0x03',
      latestClaim: '0x02',
      claimed: 50000.0,
      grantAmount: 200000.0,
      canClaim: false,
    },
    {
      id: '4',
      title: 'Synthetix',
      description:
        'Synthetix is a decentralized platform on Ethereum for creating and trading synthetic assets. It allows users to gain exposure to a wide range of assets without directly holding them.',
      date: new Date('2024-08-20'),
      delegateTo: '0x04',
      latestClaim: '0x03',
      claimed: 180000.0,
      grantAmount: 300000.0,
      canClaim: false,
    },
    {
      id: '5',
      title: 'Perpetual Protocol',
      description:
        'Perpetual Protocol is a decentralized perpetual contract trading protocol for every asset, empowering traders, liquidity providers & developers to participate in an open financial market with no barriers to entry.',
      date: new Date('2024-12-10'),
      delegateTo: '0x05',
      latestClaim: '0x04',
      claimed: 90000.0,
      grantAmount: 150000.0,
      canClaim: false,
    },
    {
      id: '6',
      title: 'Lyra Finance',
      description:
        'Lyra is an options trading protocol built on Ethereum L2s. It provides a decentralized options trading platform with competitive pricing and deep liquidity.',
      date: new Date('2025-01-15'),
      delegateTo: '0x06',
      latestClaim: '0x05',
      claimed: 120000.0,
      grantAmount: 250000.0,
      canClaim: false,
    },
    {
      id: '7',
      title: 'Polynomial Protocol',
      description:
        'Polynomial is a decentralized options and structured products protocol, enabling users to create, trade, and manage complex financial instruments on-chain.',
      date: new Date('2024-07-01'),
      delegateTo: '0x07',
      latestClaim: '0x06',
      claimed: 80000.0,
      grantAmount: 175000.0,
      canClaim: false,
    },
    {
      id: '8',
      title: 'DeFi Yield Optimizer',
      description:
        'A smart contract system that automatically maximizes yields across various DeFi protocols.',
      date: new Date('2025-02-20'),
      delegateTo: '0x08',
      latestClaim: '0x07',
      claimed: 95000.0,
      grantAmount: 200000.0,
      canClaim: false,
    },
    {
      id: '9',
      title: 'DeFi Pulse',
      description:
        'A decentralized platform for tracking DeFi metrics and providing insights.',
      date: new Date('2025-03-01'),
      delegateTo: '0x09',
      latestClaim: '0x08',
      claimed: 70000.0,
      grantAmount: 150000.0,
      canClaim: false,
    },
    {
      id: '10',
      title: 'DeFi Safety',
      description:
        'A decentralized platform for monitoring DeFi protocol security and providing alerts.',
      date: new Date('2025-04-10'),
      delegateTo: '0x10',
      latestClaim: '0x09',
      claimed: 60000.0,
      grantAmount: 120000.0,
      canClaim: false,
    },
    {
      id: '11',
      title: 'DeFi Analytics',
      description:
        'A decentralized platform for providing DeFi protocol analytics and insights.',
      date: new Date('2025-05-20'),
      delegateTo: '0x11',
      latestClaim: '0x10',
      claimed: 50000.0,
      grantAmount: 100000.0,
      canClaim: false,
    },
    {
      id: '12',
      title: 'DeFi Governance',
      description:
        'A decentralized platform for facilitating DeFi protocol governance and decision-making.',
      date: new Date('2025-06-01'),
      delegateTo: '0x12',
      latestClaim: '0x11',
      claimed: 40000.0,
      grantAmount: 80000.0,
      canClaim: false,
    },
    {
      id: '13',
      title: 'DeFi Security',
      description:
        'A decentralized platform for providing DeFi protocol security and risk management.',
      date: new Date('2025-07-10'),
      delegateTo: '0x13',
      latestClaim: '0x12',
      claimed: 30000.0,
      grantAmount: 60000.0,
      canClaim: false,
    },
    {
      id: '14',
      title: 'DeFi Innovation',
      description:
        'A decentralized platform for fostering DeFi protocol innovation and development.',
      date: new Date('2025-08-20'),
      delegateTo: '0x14',
      latestClaim: '0x13',
      claimed: 20000.0,
      grantAmount: 40000.0,
      canClaim: false,
    },
    {
      id: '15',
      title: 'DeFi Education',
      description:
        'A decentralized platform for providing DeFi protocol education and training.',
      date: new Date('2025-09-01'),
      delegateTo: '0x15',
      latestClaim: '0x14',
      claimed: 10000.0,
      grantAmount: 20000.0,
      canClaim: false,
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
