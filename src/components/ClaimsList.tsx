'use client';

import { Button } from '@/components/ui/button';
import { useGetClaim } from '@/hooks/useGetClaim';

const ClaimsList = () => {
  const { claim, isLoading, isError } = useGetClaim({
    uuid: 'fe48cfdd-5809-4bc1-a47f-1c526b36cf5f',
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading claims</p>;
  }

  if (!claim) {
    return <p>No claims found</p>;
  }

  const onClaim = () => {};

  return (
    <div className="flex flex-col gap-4 border border-border rounded-lg p-4">
      <h1>Claims</h1>
      {claim && (
        <ul>
          <li key={claim.amount}>
            <p>{claim.amount}</p>
            <Button onClick={onClaim}>Claim</Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ClaimsList;
