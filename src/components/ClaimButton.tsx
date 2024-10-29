'use client';

import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ClaimDialog } from './dialogs/ClaimDialog';

const ClaimButton = ({ grantIds }: { grantIds: string[] }) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [showClaimDialog, setShowClaimDialog] = useState(false);

  const handleClick = () => {
    if (isConnected) {
      setShowClaimDialog(true);
    } else {
      openConnectModal?.();
    }
  };

  return (
    <>
      <Button className="p-6" onClick={handleClick} variant="destructive">
        {isConnected ? 'Claim now' : 'Connect to claim'}
      </Button>
      <ClaimDialog isOpen={showClaimDialog} setOpen={setShowClaimDialog} />
    </>
  );
};

export default ClaimButton;
