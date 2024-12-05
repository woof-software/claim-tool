import { Card, CardContent } from '@/components/ui/card';
import type { Grant } from '@/context/GrantsContext';
import { generateBlockExplorerUrl } from '@/lib/getPublicClientForChain';
import { truncate } from '@/lib/truncate';
import { cn } from '@/lib/utils';
import { RiArrowRightUpLine } from '@remixicon/react';
import { Hexagon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import OPLogo from '../../../public/op.svg';
import { ClaimDialog } from '../dialogs/ClaimDialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const GrantCard = ({
  grant,
  isClaimDialogOpen = false,
}: {
  grant: Grant;
  isClaimDialogOpen?: boolean;
}) => {
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
          isClaimDialogOpen && 'border border-neutral-300 cursor-pointer',
        )}
      >
        {/* TODO: Disable based on chain */}
        {grant.currentUserCanClaim && !isClaimDialogOpen && isConnected && (
          <div className="flex items-center justify-between bg-red-200 px-10 py-2 rounded-t-lg">
            <p className="text-sm">You are eligible to claim this grant</p>
            <Button
              variant="link"
              className="text-red-500 font-semibold hover:no-underline p-0"
              onClick={handleClaim}
            >
              Claim now
            </Button>
          </div>
        )}
        <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-8 py-8 px-10">
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
                <Separator orientation="vertical" />
                {grant.tokenReleasedInDays && (
                  <>
                    <p>
                      Token released in:{' '}
                      <span className="font-semibold text-black">
                        {grant.tokenReleasedInDays}{' '}
                        {grant.tokenReleasedInDays > 1 ? 'days' : 'day'}
                      </span>
                    </p>
                    <Separator orientation="vertical" />
                  </>
                )}
                <div className="flex items-center gap-2">
                  <p>Delegate to: </p>
                  <Link
                    className="group flex items-center font-semibold text-black"
                    href="/grants"
                  >
                    {grant.delegateTo}{' '}
                    <RiArrowRightUpLine
                      className="ml-1 text-neutral-500 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
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
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <Image
              className="rounded-full flex-shrink-0 flex relative"
              alt="OP Logo"
              src={OPLogo}
              width={24}
              height={24}
            />
            <span className="text-black">{grant.claimed}</span> /
            <span className="text-gray-500">{grant.grantAmount}</span>
          </div>
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
