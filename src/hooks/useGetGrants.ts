import type { GrantClaimRow } from '@/app/api/grants/route';
import { useQuery } from '@tanstack/react-query';

type ApiResponse = {
  data: GrantClaimRow[];
};

export const useGetGrants = () => {
  const { data, isLoading, isError } = useQuery<GrantClaimRow[]>({
    queryKey: ['grants'],
    queryFn: async () => {
      const response = await fetch('/api/grants');
      const result: ApiResponse = await response.json();
      return result.data;
    },
  });

  return {
    grants: data ?? [],
    isLoading,
    isError,
  };
};
