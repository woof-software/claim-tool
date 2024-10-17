'use client';

import ClaimButton from '@/components/ClaimButton';
import GrantCard from '@/components/common/GrantCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGrants } from '@/context/GrantsContext';
import { ArrowUpDown, Search } from 'lucide-react';

const GrantsList = () => {
  const { displayedGrants, loadMore, grants } = useGrants();

  return (
    <ScrollArea className="mt-4">
      <div className="flex flex-col gap-4">
        {displayedGrants.map((grant) => (
          <GrantCard key={grant.title} grant={grant} />
        ))}
      </div>
      {displayedGrants.length < grants.length && (
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
          <input
            type="text"
            placeholder="Search grant"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <Select defaultValue="Highest">
          <SelectTrigger className="w-[180px] bg-neutral-200">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highest" aria-selected>
              <div className="flex items-center gap-2">
                <span>Highest grant</span> <ArrowUpDown className="w-4 h-4" />
              </div>
            </SelectItem>
            <SelectItem value="Lowest">
              <div className="flex items-center gap-2">
                <span>Lowest grant</span> <ArrowUpDown className="w-4 h-4" />
              </div>
            </SelectItem>
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
      <GrantsList />
    </>
  );
};

export default Grants;
