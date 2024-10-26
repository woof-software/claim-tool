'use client';

import { Button } from '@/components/ui/button';
import { useGetClaims } from '@/hooks/useGetClaims';
import { useAccount } from 'wagmi';

const ClaimsList = () => {
  const { claims, isLoading, isError } = useGetClaims();
  const { address } = useAccount();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading claims</p>;
  }

  // const response = await fetch(`/api/claims?address=${address}`);
  // const claims: Claim[] = await response.json();

  if (!claims || claims.length === 0) {
    return <p>No claims found</p>;
  }

  const onClaim = () => {
    console.log('Claim list', claims);
  };

  console.log(claims);

  return (
    <div>
      <h1>Claims</h1>
      {claims && (
        <ul>
          {claims.map((claim) => (
            <li key={claim.amount}>
              <p>{claim.amount}</p>
              <Button onClick={onClaim}>Claim</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClaimsList;
