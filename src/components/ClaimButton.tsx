'use client';

import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';

const ClaimButton = () => {
  const { isConnected } = useAccount();
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
        <Button className="p-6" onClick={handleClick} variant="destructive">
          Connect to claim
        </Button>
      )}
    </>
  );
};

export default ClaimButton;
