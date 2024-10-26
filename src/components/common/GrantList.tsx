import type { Grant } from '@/context/GrantsContext';
import { ScrollArea } from '../ui/scroll-area';
import GrantCard from './GrantCard';

const GrantsList = ({
  grants,
  isClaimDialogOpen,
  onSelectGrant,
}: {
  grants: Grant[];
  isClaimDialogOpen?: boolean;
  onSelectGrant?: (id: string) => void;
}) => {
  return (
    <ScrollArea className="mt-4">
      <div className="flex flex-col gap-4">
        {grants.map((grant) =>
          isClaimDialogOpen ? (
            <div
              onClick={() => onSelectGrant?.(grant.id)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectGrant?.(grant.id)}
              key={grant.id}
            >
              <GrantCard grant={grant} isClaimDialogOpen />
            </div>
          ) : (
            <GrantCard key={grant.id} grant={grant} />
          ),
        )}
      </div>
    </ScrollArea>
  );
};

export default GrantsList;
