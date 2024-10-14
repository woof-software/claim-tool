'use client';

import { Button } from '@/components/ui/button';

const ClaimButton = () => {
  const handleClick = () => {
    console.log('claim');
  };

  return (
    <Button onClick={handleClick} variant="default">
      Claim
    </Button>
  );
};

export default ClaimButton;
