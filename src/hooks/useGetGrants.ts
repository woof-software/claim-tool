import type { GrantClaimRow, ResponseData } from '@/app/api/grants/route';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetGrants = () => {
  const [grants, setGrants] = useState<GrantClaimRow[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['grants'],
    queryFn: async () => {
      const response = await fetch('/api/grants');
      const data: ResponseData = await response.json();

      console.log('Response data', data);

      return data.data;
    },
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      setGrants(data);
    }
  }, [data]);

  return {
    grants,
    isLoading,
    isError,
  };
};
