import { Skeleton } from '@/components/ui/skeleton';

export const GrantHistoryItemSkeleton = () => {
  return (
    <div className="flex items-start gap-14 w-full bg-white rounded-lg p-6">
      <div className="space-y-6 grow">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-10 h-10 rounded" />
            <div className="flex flex-col gap-2 max-w-2xl">
              <Skeleton className="h-7 w-[300px]" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
