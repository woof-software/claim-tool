import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { ClaimHistoryEvent } from '@/hooks/useClaimHistory';
import type { HedgeyCampaign } from '@/hooks/useGetHedgeyCampaigns';
import { generateBlockExplorerUrl } from '@/lib/getPublicClientForChain';
import { RiArrowRightUpLine } from '@remixicon/react';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { CurrencySymbol } from './CurrencySymbol';

export const TransactionCard = ({
  date,
  milestone,
  claimedAmount,
  transactionHash,
  chainId,
  token,
}: ClaimHistoryEvent & { chainId: number; token: HedgeyCampaign['token'] }) => {
  return (
    <Card className="shadow-none border">
      <CardContent className="py-4 px-4 space-y-4">
        <p className="text-sm font-semibold">{date?.toLocaleDateString()}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <p className="flex items-center gap-2">
            Milestone:{' '}
            <span className="font-semibold text-black">{milestone}</span>
          </p>
          <Separator orientation="vertical" />
          {token && (
            <div className="flex items-center gap-2">
              <CurrencySymbol token={token} />
              <p>Claimed: </p>
              <p className="font-semibold text-black">
                {formatUnits(
                  BigInt(claimedAmount),
                  token.decimals || 18,
                )?.toLocaleString()}{' '}
                {token.ticker}
              </p>
            </div>
          )}
          <Separator orientation="vertical" />
          <div className="flex items-center gap-2">
            <p>Transaction: </p>
            <Link
              className="group flex items-center font-semibold text-black"
              href={generateBlockExplorerUrl(chainId, transactionHash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash?.slice(0, 6)}...{transactionHash?.slice(-4)}{' '}
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
