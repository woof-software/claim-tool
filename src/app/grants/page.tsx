'use client';

import ClaimButton from '@/components/ClaimButton';
import GrantCard from '@/components/common/GrantCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGrants } from '@/context/GrantsContext';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type FilterOption = 'Highest' | 'Lowest' | 'MostClaimed' | 'LeastClaimed';

const GrantsList = ({
  searchTerm,
  filter,
}: { searchTerm: string; filter: FilterOption }) => {
  const { displayedGrants, loadMore, grants } = useGrants();

  const filteredAndSortedGrants = useMemo(() => {
    const filtered = displayedGrants.filter((grant) =>
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    switch (filter) {
      case 'Highest':
        filtered.sort((a, b) => b.grantAmount - a.grantAmount);
        break;
      case 'Lowest':
        filtered.sort((a, b) => a.grantAmount - b.grantAmount);
        break;
      case 'MostClaimed':
        filtered.sort((a, b) => b.claimed - a.claimed);
        break;
      case 'LeastClaimed':
        filtered.sort((a, b) => a.claimed - b.claimed);
        break;
    }

    return filtered;
  }, [displayedGrants, searchTerm, filter]);

  return (
    <ScrollArea className="mt-4">
      <div className="flex flex-col gap-4">
        {filteredAndSortedGrants.map((grant) => (
          <GrantCard key={grant.title} grant={grant} />
        ))}
      </div>
      {displayedGrants.length < grants.length && !searchTerm && (
        <div className="mt-4 flex justify-center">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};

const Grants = () => {
  const { grants } = useGrants();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('Highest');

  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20 max-w-2xl">
        <h1 className="text-4xl font-bold">Grants</h1>
        <p>
          Explore all grants from the OP Citizen Grants Council and who they've
          delegated to. For grantees, this claiming tool offers a self-serve
          interface to claim and delegate your grant.
        </p>
        <ClaimButton />
      </div>
      <div className="flex items-center gap-2 my-6">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search grant"
            className="w-full pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Select
          value={filter}
          onValueChange={(value) => setFilter(value as FilterOption)}
        >
          <SelectTrigger className="w-[180px] bg-neutral-200">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highest">Highest grant</SelectItem>
            <SelectItem value="Lowest">Lowest grant</SelectItem>
            <SelectItem value="MostClaimed">Most claimed</SelectItem>
            <SelectItem value="LeastClaimed">Least claimed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="bg-white w-full flex items-center justify-between py-3 px-10 rounded-lg">
        <p className="font-semibold">{grants.length} Projects</p>
        <p className="font-semibold">
          <span>Claimed</span> /{' '}
          <span className="text-gray-500">Grant amount</span>
        </p>
      </div>
      <GrantsList searchTerm={searchTerm} filter={filter} />
    </>
  );
};

export default Grants;
