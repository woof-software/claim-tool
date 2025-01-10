import type { Grant } from '@/context/GrantsContext';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import GrantCard from './GrantCard';

const GrantsList = ({
  grants,
}: {
  grants: Grant[];
  isClaimDialogOpen?: boolean;
  onSelectGrant?: (id: string) => void;
}) => {
  return (
    <ScrollArea className="mt-4">
      <div className="flex flex-col gap-4">
        {grants.map((grant) => (
          <GrantCard key={grant.id} grant={grant} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default GrantsList;
