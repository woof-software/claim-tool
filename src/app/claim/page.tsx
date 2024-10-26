'use client';

import GrantsList from '@/components/common/GrantList';
import { useGrants } from '@/context/GrantsContext';

export default function ClaimPage() {
  const { grants } = useGrants();
  const claimableGrants = grants.filter((grant) => grant.canClaim);

  return (
    <div className="space-y-6 pt-20">
      <h1 className="text-4xl font-bold">
        Which project would you like to claim?
      </h1>
      <GrantsList grants={claimableGrants} />
    </div>
  );
}
