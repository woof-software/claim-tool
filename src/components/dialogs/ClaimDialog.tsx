import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useGrants } from '@/context/GrantsContext';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import OPLogo from '../../../public/op.svg';
import ClaimCard from '../common/ClaimCard';
import { DaysUntilCard } from '../common/DaysUntilCard';
import GrantsList from '../common/GrantList';
import InfoCard from '../common/InfoCard';
import ProjectCard from '../common/ProjectCard';

export function ClaimDialog({
  isOpen,
  setOpen,
  grantId,
}: {
  isOpen: boolean;
  setOpen: ComponentProps<typeof Dialog>['onOpenChange'];
  grantId?: string;
}) {
  const { grants } = useGrants();
  const claimableGrants = grants.filter((grant) => grant.currentUserCanClaim);
  const [selectedGrantId, setSelectedGrantId] = useState<string | undefined>(
    grantId,
  );
  const chainId = useChainId();

  const selectedGrant = selectedGrantId
    ? grants.find((grant) => grant.id === selectedGrantId)
    : undefined;

  const handleGrantSelect = (id: string) => {
    const selectedGrant = grants.find((grant) => grant.id === id);
    if (selectedGrant?.chainId !== chainId) {
      return;
    }
    setSelectedGrantId(id);
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedGrantId(undefined);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="min-w-full h-screen rounded-none">
        <VisuallyHidden asChild>
          <DialogTitle>Claim Grant</DialogTitle>
        </VisuallyHidden>
        <div className="space-y-6 pt-20 mx-auto max-w-5xl">
          {selectedGrant ? (
            <>
              <h1 className="text-4xl font-bold">You're claiming for</h1>
              <h1 className="text-4xl font-bold flex items-center gap-2">
                <span className="bg-neutral-200 rounded-md p-3">
                  {selectedGrant?.title}
                </span>
                with
                <span className="bg-neutral-200 rounded-md p-3 flex items-center gap-2 w-fit">
                  <Image
                    className="rounded-full flex-shrink-0 flex relative"
                    alt="OP Logo"
                    src={OPLogo}
                    width={24}
                    height={24}
                  />
                  {selectedGrant?.grantAmount}
                </span>
              </h1>
              <div className="pt-14 flex items-start gap-14">
                <ClaimCard grant={selectedGrant} />
                <div className="flex flex-col gap-2">
                  <ProjectCard grant={selectedGrant} />
                  <DaysUntilCard grant={selectedGrant} />
                  <InfoCard />
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold pb-14">
                Which project would you like to claim?
              </h1>
              <GrantsList
                grants={claimableGrants}
                isClaimDialogOpen
                onSelectGrant={handleGrantSelect}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
