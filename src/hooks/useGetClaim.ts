'use client';
import { useCallback, useEffect, useState } from 'react';

import type { Claim, ResponseData } from '@/app/api/claims/route';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export const useGetClaim = ({ uuid }: { uuid: string }) => {
  const [claim, setClaim] = useState<Claim | undefined>(undefined);
  const { address } = useAccount();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const response = await fetch(
        `/api/claims?uuid=${uuid}&address=${address}`,
      );
      const data: ResponseData = await response.json();

      // if empty object, return empty array
      if (!data.data) {
        return;
      }

      return data.data;
    },
    enabled: !!address,
  });

  useEffect(() => {
    if (data) {
      setClaim(data);
    }
  }, [data]);

  const getClaim = useCallback(
    async ({ address, uuid }: { address: string; uuid: string }) => {
      if (isLoading) {
        return;
      }
      const response = await fetch(
        `/api/claims?uuid=${uuid}&address=${address}`,
      );
      const data: ResponseData = await response.json();

      setClaim(data.data);
    },
    [isLoading],
  );

  return {
    claim,
    isLoading,
    isError,
    getClaim,
  };
};
