'use client';
import { useCallback, useEffect, useState } from 'react';

import type { Claim, ResponseData } from '@/app/api/claims/route';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export const useGetClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const { address } = useAccount();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const response = await fetch(`/api/claims?address=${address}`);
      const data: ResponseData = await response.json();
      return data.data;
    },
    enabled: !!address,
  });

  useEffect(() => {
    if (data) {
      setClaims(data);
    }
  }, [data]);

  const getClaims = useCallback(
    async ({ address }: { address: string }) => {
      if (isLoading) {
        return;
      }
      const response = await fetch(`/api/claims?address=${address}`);
      const data: Claim[] = await response.json();
      setClaims(data);
    },
    [isLoading],
  );

  return {
    claims,
    isLoading,
    isError,
    getClaims,
  };
};
