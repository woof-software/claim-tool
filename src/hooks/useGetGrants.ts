import type { GrantRow } from '@/app/api/grants/route';
import { useQuery } from '@tanstack/react-query';

type ApiResponse = {
  data: GrantRow[];
};

export const useGetGrants = () => {
  const { data, isLoading, isError } = useQuery<GrantRow[]>({
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
