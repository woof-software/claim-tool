import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RiArrowRightUpLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import OPLogo from '../../../public/op.svg';

interface TransactionCardProps {
  date: string;
  milestone: number;
  claimedAmount: number;
  transactionHash: string;
}

export const TransactionCard = ({
  date,
  milestone,
  claimedAmount,
  transactionHash,
}: TransactionCardProps) => {
  return (
    <Card className="shadow-none border-none">
      <CardContent className="py-8 px-10 space-y-6">
        <p className="text-sm font-semibold">{date}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <p>
            Milestone:{' '}
            <span className="font-semibold text-black">{milestone}</span>
          </p>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full flex-shrink-0 flex relative"
              alt="OP Logo"
              src={OPLogo}
              width={24}
              height={24}
            />
            <p>Claimed: </p>
            <p className="font-semibold text-black">
              {claimedAmount.toLocaleString()}
            </p>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <p>Transaction: </p>
            <Link
              className="group flex items-center font-semibold text-black"
              href={`https://optimistic.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}{' '}
              <RiArrowRightUpLine
                className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
