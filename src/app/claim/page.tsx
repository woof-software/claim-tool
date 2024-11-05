'use client';

import ClaimButton from '@/components/ClaimButton';
import { TransactionCard } from '@/components/common/TransactionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RiArrowRightUpLine } from '@remixicon/react';
import { Hexagon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import OPLogo from '../../../public/op.svg';

const transactionHistory = [
  {
    date: 'Oct 12, 2024',
    milestone: 1,
    claimedAmount: 3000,
    transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    date: 'Nov 15, 2024',
    milestone: 2,
    claimedAmount: 5000,
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
];

const ClaimHistory = () => {
  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20 h-screen">
        <h1 className="text-4xl font-bold mb-16">Claim History</h1>
        <div className="flex items-start gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Hexagon className="w-10 h-10" />
              <div className="flex flex-col gap-2 max-w-2xl">
                <p className="font-semibold text-xl">Party Protocol</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <p>
                    Date of award:{' '}
                    <span className="font-semibold text-black">
                      Oct 1, 2024
                    </span>
                  </p>
                  <Separator orientation="vertical" />
                  <div className="flex items-center gap-2">
                    <p>Delegate to: </p>
                    <Link
                      className="group flex items-center font-semibold text-black"
                      href="/grants"
                    >
                      0x01{' '}
                      <RiArrowRightUpLine
                        className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex items-center gap-2">
                    <p>Remaining: </p>
                    <Image
                      className="rounded-full flex-shrink-0 flex relative"
                      alt="OP Logo"
                      src={OPLogo}
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold text-black">2,000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              {transactionHistory.map((transaction) => (
                <TransactionCard
                  key={transaction.transactionHash}
                  {...transaction}
                />
              ))}
            </div>
          </div>
          <Card className="w-[424px] border-black shadow-none bg-transparent">
            <CardContent className="py-8 px-10 space-y-6">
              <div className="flex items-center justify-between">
                <p>Awarded project</p>
                <p className="text-lg font-semibold">1</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total awarded amount</p>
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full flex-shrink-0 flex relative"
                    alt="OP Logo"
                    src={OPLogo}
                    width={24}
                    height={24}
                  />
                  <p className="text-lg font-semibold">30,000</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>Remaining/Unclaimed</p>
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full flex-shrink-0 flex relative"
                    alt="OP Logo"
                    src={OPLogo}
                    width={24}
                    height={24}
                  />
                  <p className="text-lg font-semibold">2,000</p>
                </div>
              </div>
              <ClaimButton grantIds={['1']} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ClaimHistory;
