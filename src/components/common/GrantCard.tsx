import { Card, CardContent } from '@/components/ui/card';
import type { Grant } from '@/context/GrantsContext';
import {
  generateBlockExplorerUrl,
  getChainForChainId,
} from '@/lib/getPublicClientForChain';
import { truncate } from '@/lib/truncate';
import { cn } from '@/lib/utils';
import { RiArrowRightUpLine } from '@remixicon/react';
import { Hexagon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ClaimDialog } from '../dialogs/ClaimDialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CurrencySymbol } from './CurrencySymbol';

const GrantCard = ({
  grant,
  isClaimDialogOpen = false,
}: {
  grant: Grant;
  isClaimDialogOpen?: boolean;
}) => {
  const chainId = useChainId();

  const isCorrectChain = grant.chainId === chainId;
  const chain = getChainForChainId(grant.chainId);

  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const { isConnected } = useAccount();

  const handleClaim = () => {
    setShowClaimDialog(true);
  };

  return (
    <>
      <Card
        className={cn(
          'shadow-none',
          isClaimDialogOpen && 'border border-neutral-300',
          isClaimDialogOpen && isCorrectChain && 'cursor-pointer',
        )}
      >
        {grant.currentUserCanClaim &&
          isClaimDialogOpen &&
          isConnected &&
          !isCorrectChain && (
            <div className="flex items-center justify-between bg-bgClaimcardHeader px-10 py-2 rounded-t-lg">
              <p className="text-sm">
                You are eligible to claim this grant on <b>{chain.name}</b>
              </p>
            </div>
          )}
        {grant.currentUserCanClaim && !isClaimDialogOpen && isConnected && (
          <div className="flex items-center justify-between bg-bgClaimcardHeader px-10 py-2 rounded-t-lg">
            <p className="text-sm">
              You are eligible to claim this grant
              {!isCorrectChain && (
                <span>
                  {' '}
                  on <b>{chain.name}</b>
                </span>
              )}
            </p>
            {isCorrectChain ? (
              <Button
                variant="link"
                className="text-primaryAction font-semibold hover:no-underline p-0"
                onClick={handleClaim}
              >
                Claim now
              </Button>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        disabled
                        variant="link"
                        className="text-primaryAction font-semibold hover:no-underline p-0 cursor-not-allowed"
                      >
                        Claim now
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-black">
                      Please switch to {chain.name} to claim this grant
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
        <CardContent className="flex flex-col md:flex-row items-start md:items-center space-between py-8 px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 flex-grow">
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
                {grant.tokenReleasedInDays && (
                  <>
                    <Separator orientation="vertical" />
                    <p>
                      Released in:{' '}
                      <span className="font-semibold text-black">
                        {grant.tokenReleasedInDays}{' '}
                        {grant.tokenReleasedInDays > 1 ? 'days' : 'day'}
                      </span>
                    </p>
                  </>
                )}
                {grant.delegateTo && (
                  <>
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-2">
                      <p>Delegate to: </p>
                      <Link
                        className="group flex items-center font-semibold text-black"
                        href={generateBlockExplorerUrl(
                          grant.chainId,
                          grant.delegateTo,
                        )}
                        target="_blank"
                      >
                        {truncate(grant.delegateTo, 11)}{' '}
                        <RiArrowRightUpLine
                          className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </>
                )}
                {grant.latestClaimHash && (
                  <>
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-2">
                      <p>Latest claim: </p>
                      <a
                        target="_blank"
                        className="group flex items-center font-semibold text-black"
                        href={generateBlockExplorerUrl(
                          grant.chainId,
                          grant.latestClaimHash,
                        )}
                        rel="noreferrer"
                      >
                        {truncate(grant.latestClaimHash, 11)}{' '}
                        <RiArrowRightUpLine
                          className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {grant.campaign.token && (
            <div className="flex items-center gap-2 font-semibold">
              <CurrencySymbol token={grant.campaign.token} />
              <span className="text-black">{grant.claimed}</span> /
              <span className="text-gray-500">
                {grant.grantAmount} {grant.campaign.token.ticker}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
      {!isClaimDialogOpen && (
        <ClaimDialog
          isOpen={showClaimDialog}
          setOpen={setShowClaimDialog}
          grantId={grant.id}
        />
      )}
    </>
  );
};

export default GrantCard;
