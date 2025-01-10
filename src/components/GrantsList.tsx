'use client';

import { Button } from '@/components/ui/button';
import { useGetGrants } from '@/hooks/useGetGrants';

const GrantsList = () => {
  const { grants, isLoading, isError } = useGetGrants();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading grants</p>;
  }

  if (!grants || grants.length === 0) {
    return <p>No grants found</p>;
  }

  return (
    <div className="flex flex-col gap-4 border border-border rounded-lg p-4">
      <h1>Grants</h1>
      {grants.map((grant) => (
        <div key={grant.uuid}>
          <h2>{grant.title}</h2>
          <p>{grant.description}</p>
          <Button>Claim</Button>
        </div>
      ))}
    </div>
  );
};

export default GrantsList;
