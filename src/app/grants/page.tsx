import ClaimButton from '@/components/ClaimButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Hexagon, Search } from 'lucide-react';

const grants = [
  {
    title: 'Party Protocol',
    description:
      'The Party Protocol is an open-source protocol for group coordination. It provides flexible and powerful primitives for creating a shared smart contract account governed by a group of people, big or small. Party.app is the flagship UI / app built on top. It allows groups to form a small group wallet, and large on-chain DAO, or anything in-between. Party.app has built-in functionality for crowdfunding, governance, using apps via wallet connect, buying & selling NFTs, trading tokens, chatting, and much more.',
    date: new Date('2024-10-01'),
    delegateTo: '0x01',
    latestClaim: '0x00',
    claimed: '138571.80 / 250000.00',
  },
  {
    title: 'Optimism Collective',
    description:
      'The Optimism Collective is a large-scale experiment in digital democratic governance, built to drive rapid and sustainable growth of the Optimism ecosystem.',
    date: new Date('2024-09-15'),
    delegateTo: '0x02',
    latestClaim: '0x01',
    claimed: '75000.00 / 100000.00',
  },
  {
    title: 'Velodrome Finance',
    description:
      'Velodrome is a next-generation AMM built on the Optimism network, designed to maximize capital efficiency and provide sustainable rewards for liquidity providers.',
    date: new Date('2024-11-30'),
    delegateTo: '0x03',
    latestClaim: '0x02',
    claimed: '50000.00 / 200000.00',
  },
  {
    title: 'Synthetix',
    description:
      'Synthetix is a decentralized platform on Ethereum for creating and trading synthetic assets. It allows users to gain exposure to a wide range of assets without directly holding them.',
    date: new Date('2024-08-20'),
    delegateTo: '0x04',
    latestClaim: '0x03',
    claimed: '180000.00 / 300000.00',
  },
  {
    title: 'Perpetual Protocol',
    description:
      'Perpetual Protocol is a decentralized perpetual contract trading protocol for every asset, empowering traders, liquidity providers & developers to participate in an open financial market with no barriers to entry.',
    date: new Date('2024-12-10'),
    delegateTo: '0x05',
    latestClaim: '0x04',
    claimed: '90000.00 / 150000.00',
  },
  {
    title: 'Lyra Finance',
    description:
      'Lyra is an options trading protocol built on Ethereum L2s. It provides a decentralized options trading platform with competitive pricing and deep liquidity.',
    date: new Date('2025-01-15'),
    delegateTo: '0x06',
    latestClaim: '0x05',
    claimed: '120000.00 / 250000.00',
  },
  {
    title: 'Polynomial Protocol',
    description:
      'Polynomial is a decentralized options and structured products protocol, enabling users to create, trade, and manage complex financial instruments on-chain.',
    date: new Date('2024-07-01'),
    delegateTo: '0x07',
    latestClaim: '0x06',
    claimed: '80000.00 / 175000.00',
  },
];

const Grants = () => {
  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20 max-w-2xl">
        <h1 className="text-4xl font-bold">Grants</h1>
        <p>
          Explore all the grants and their delegation. Claim tool offer a
          self-serve interface for all grantees to appoint delegate and claim
          their rewards.
        </p>
        <ClaimButton />
      </div>
      <div className="flex items-center gap-2 my-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search grant"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Button variant="outline">Highest grant</Button>
      </div>
      <div className="bg-white w-full flex items-center justify-between p-2 rounded-lg">
        <p className="font-semibold">25 Projects</p>
        <p className="font-semibold">
          <span>Claimed</span> /{' '}
          <span className="text-gray-500">Grant amount</span>
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {grants.map((grant) => (
          <Card className="border-none shadow-none" key={grant.title}>
            <CardContent className="flex items-center gap-8 p-6">
              <Hexagon className="w-10 h-10" />
              <div className="flex flex-col gap-2 max-w-2xl">
                <p className="font-semibold">{grant.title}</p>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {grant.description}
                </p>
                <div className="flex h-5 items-center space-x-4 text-sm text-gray-500 mt-8">
                  <p>
                    Date of award:{' '}
                    <span className="font-semibold">
                      {grant.date.toLocaleDateString()}
                    </span>
                  </p>
                  <Separator orientation="vertical" />
                  <p>
                    Delegate to:{' '}
                    <span className="font-semibold">{grant.delegateTo}</span>
                  </p>
                  <Separator orientation="vertical" />
                  <p>
                    Latest claim:{' '}
                    <span className="font-semibold">{grant.latestClaim}</span>
                  </p>
                </div>
              </div>
              <p className="font-semibold">{grant.claimed}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Grants;
