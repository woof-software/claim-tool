'use client';

import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const ClaimButton = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const handleClick = () => {
    console.log('claim');
  };

  return (
    <>
      {isConnected ? (
        <Button className="p-6" onClick={handleClick} variant="destructive">
          Claim now
        </Button>
      ) : (
        <Button
          className="p-6"
          onClick={openConnectModal}
          variant="destructive"
        >
          Connect to claim
        </Button>
      )}
    </>
  );
};

export default ClaimButton;
