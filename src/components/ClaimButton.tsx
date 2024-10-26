'use client';

import { Button } from '@/components/ui/button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

const ClaimButton = ({ grantIds }: { grantIds: string[] }) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const handleClick = () => {
    if (grantIds.length === 1) {
      router.push(`/claim/${grantIds[0]}`);
    } else if (grantIds.length > 1) {
      router.push('/claim');
    }
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
