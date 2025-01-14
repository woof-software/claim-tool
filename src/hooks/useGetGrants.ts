import type { GrantRow } from '@/app/api/grants/route';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

type ApiResponse = {
  data: GrantRow[];
};

export const useGetGrants = () => {
  const { address } = useAccount();
  const { data, isLoading, isError } = useQuery<GrantRow[]>({
    queryKey: ['grants', address],
    queryFn: async () => {
      const response = await fetch(`/api/grants?address=${address}`);
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
