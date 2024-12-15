'use client';

import ClaimButton from '@/components/ClaimButton';
import GrantsList from '@/components/common/GrantList';
import { SpinningLoader } from '@/components/common/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOption, useGrants } from '@/context/GrantsContext';
import { Loader, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

const Grants = () => {
  const { displayedGrants, loadMore, grants, isLoading } = useGrants();
  const { isConnected } = useAccount();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>(FilterOption.Highest);

  const claimableGrants = useMemo(() => {
    return grants.filter((grant) => grant.currentUserCanClaim);
  }, [grants]);

  const claimableGrantIds = claimableGrants.map((grant) => grant.id);

  const filteredAndSortedGrants = useMemo(() => {
    let filtered = displayedGrants;

    if (searchTerm) {
      filtered = filtered.filter((grant) =>
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    switch (filter) {
      case FilterOption.Highest:
        filtered.sort(
          (a, b) =>
            Number(b.campaign.totalAmount) - Number(a.campaign.totalAmount),
        );
        break;
      case FilterOption.Lowest:
        filtered.sort(
          (a, b) =>
            Number(a.campaign.totalAmount) - Number(b.campaign.totalAmount),
        );
        break;
      case FilterOption.MostClaimed:
        filtered.sort((a, b) => b.claimed - a.claimed);
        break;
      case FilterOption.LeastClaimed:
        filtered.sort((a, b) => a.claimed - b.claimed);
        break;
    }

    return filtered;
  }, [displayedGrants, searchTerm, filter]);

  return (
    <>
      <div className="flex flex-col gap-6 items-start">
        <h1 className="text-4xl font-bold">Grants</h1>
        <p>
          Explore all grants from the OP Citizen Grants Council and who they've
          delegated to. For grantees, this claiming tool offers a self-serve
          interface to claim and delegate your grant.
        </p>
        <div className="flex items-center gap-4">
          <ClaimButton grantIds={claimableGrantIds} />
          {claimableGrants.length > 0 && isConnected && (
            <span className="text-sm font-medium text-gray-500">
              {claimableGrants.length} grant
              {claimableGrants.length > 1 ? 's' : ''} available to claim
            </span>
          )}
        </div>
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
      {isLoading ? (
        <SpinningLoader />
      ) : (
        <GrantsList grants={filteredAndSortedGrants} />
      )}
      {filteredAndSortedGrants.length < grants.length && (
        <div className="mt-4 flex justify-center">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default Grants;
