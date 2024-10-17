'use client';

import DelegateCard from '@/components/common/DelegateCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDelegates } from '@/context/DelegatesContext';

const DelegatesList = () => {
  const { displayedDelegates, loadMore, delegates } = useDelegates();

  return (
    <ScrollArea className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {displayedDelegates.map((delegate) => (
          <DelegateCard key={delegate.address} delegate={delegate} />
        ))}
      </div>
      {displayedDelegates.length < delegates.length && (
        <div className="mt-4 flex justify-center">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};

const Delegates = () => {
  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20 max-w-2xl">
        <h1 className="text-4xl font-bold">Delegates</h1>
        <p>
          Explore all the delegates and their delegation. Claim tool offer a
          self-serve interface for all grantees to appoint delegate and claim
          their rewards.
        </p>
      </div>
      <DelegatesList />
    </>
  );
};

export default Delegates;
