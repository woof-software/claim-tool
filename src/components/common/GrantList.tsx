import type { Grant } from '@/context/GrantsContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '../ui/scroll-area';
import GrantCard from './GrantCard';

const GrantsList = ({
  grants,
}: {
  grants: Grant[];
}) => {
  const pathname = usePathname();
  const isClaimPage = pathname.startsWith('/claim');

  return (
    <ScrollArea className="mt-4">
      <div className="flex flex-col gap-4">
        {grants.map((grant) =>
          isClaimPage ? (
            <Link href={`/claim/${grant.id}`} key={grant.id}>
              <GrantCard grant={grant} />
            </Link>
          ) : (
            <GrantCard key={grant.id} grant={grant} />
          ),
        )}
      </div>
    </ScrollArea>
  );
};

export default GrantsList;
