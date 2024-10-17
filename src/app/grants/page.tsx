import ClaimButton from '@/components/ClaimButton';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowUpDown, ArrowUpRight, Hexagon, Search } from 'lucide-react';
import Link from 'next/link';

const grants = [
  {
    title: 'Party Protocol',
    description:
      'The Party Protocol is an open-source protocol for group coordination. It provides flexible and powerful primitives for creating a shared smart contract account governed by a group of people, big or small. Party.app is the flagship UI / app built on top. It allows groups to form a small group wallet, and large on-chain DAO, or anything in-between. Party.app has built-in functionality for crowdfunding, governance, using apps via wallet connect, buying & selling NFTs, trading tokens, chatting, and much more.',
    date: new Date('2024-10-01'),
    delegateTo: '0x01',
    latestClaim: '0x00',
    claimed: 138571.8,
    grantAmount: 250000.0,
  },
  {
    title: 'Optimism Collective',
    description:
      'The Optimism Collective is a large-scale experiment in digital democratic governance, built to drive rapid and sustainable growth of the Optimism ecosystem.',
    date: new Date('2024-09-15'),
    delegateTo: '0x02',
    latestClaim: '0x01',
    claimed: 75000.0,
    grantAmount: 100000.0,
  },
  {
    title: 'Velodrome Finance',
    description:
      'Velodrome is a next-generation AMM built on the Optimism network, designed to maximize capital efficiency and provide sustainable rewards for liquidity providers.',
    date: new Date('2024-11-30'),
    delegateTo: '0x03',
    latestClaim: '0x02',
    claimed: 50000.0,
    grantAmount: 200000.0,
  },
  {
    title: 'Synthetix',
    description:
      'Synthetix is a decentralized platform on Ethereum for creating and trading synthetic assets. It allows users to gain exposure to a wide range of assets without directly holding them.',
    date: new Date('2024-08-20'),
    delegateTo: '0x04',
    latestClaim: '0x03',
    claimed: 180000.0,
    grantAmount: 300000.0,
  },
  {
    title: 'Perpetual Protocol',
    description:
      'Perpetual Protocol is a decentralized perpetual contract trading protocol for every asset, empowering traders, liquidity providers & developers to participate in an open financial market with no barriers to entry.',
    date: new Date('2024-12-10'),
    delegateTo: '0x05',
    latestClaim: '0x04',
    claimed: 90000.0,
    grantAmount: 150000.0,
  },
  {
    title: 'Lyra Finance',
    description:
      'Lyra is an options trading protocol built on Ethereum L2s. It provides a decentralized options trading platform with competitive pricing and deep liquidity.',
    date: new Date('2025-01-15'),
    delegateTo: '0x06',
    latestClaim: '0x05',
    claimed: 120000.0,
    grantAmount: 250000.0,
  },
  {
    title: 'Polynomial Protocol',
    description:
      'Polynomial is a decentralized options and structured products protocol, enabling users to create, trade, and manage complex financial instruments on-chain.',
    date: new Date('2024-07-01'),
    delegateTo: '0x07',
    latestClaim: '0x06',
    claimed: 80000.0,
    grantAmount: 175000.0,
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
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search grant"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Select defaultValue="Highest">
          <SelectTrigger className="w-[180px] bg-neutral-200">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highest" aria-selected>
              <div className="flex items-center gap-2">
                <span>Highest grant</span> <ArrowUpDown className="w-4 h-4" />
              </div>
            </SelectItem>
            <SelectItem value="Lowest">Lowest grant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white w-full flex items-center justify-between py-3 px-10 rounded-lg">
        <p className="font-semibold">25 Projects</p>
        <p className="font-semibold">
          <span>Claimed</span> /{' '}
          <span className="text-gray-500">Grant amount</span>
        </p>
      </div>
      <ScrollArea className="mt-4">
        <div className="flex flex-col gap-4">
          {grants.map((grant) => (
            <Card
              className="border-none shadow-none py-8 px-10"
              key={grant.title}
            >
              <CardContent className="flex items-center gap-8 p-0">
                <Hexagon className="w-10 h-10" />
                <div className="flex flex-col gap-2 max-w-2xl">
                  <p className="font-semibold text-xl">{grant.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {grant.description}
                  </p>
                  <div className="flex h-5 items-center space-x-4 text-xs text-gray-500 mt-8">
                    <p>
                      Date of award:{' '}
                      <span className="font-semibold text-black">
                        {grant.date.toLocaleDateString()}
                      </span>
                    </p>
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-2">
                      <p>Delegate to: </p>
                      <Link
                        className="group flex items-center font-semibold text-black"
                        href="/grants"
                      >
                        {grant.delegateTo}{' '}
                        <ArrowUpRight
                          className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-2">
                      <p>Latest claim: </p>
                      <Link
                        className="group flex items-center font-semibold text-black"
                        href="/grants"
                      >
                        {grant.latestClaim}{' '}
                        <ArrowUpRight
                          className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-black">{grant.claimed}</span> /
                  <span className="text-gray-500">{grant.grantAmount}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default Grants;
