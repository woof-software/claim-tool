import { customFetch } from '@/lib/customFetch';
import type {
  GetDelegatesParams,
  getDelegatesResponse,
} from '@/types/delegates';
import { useQuery } from '@tanstack/react-query';

export const getGetDelegatesUrl = (params?: GetDelegatesParams) => {
  const normalizedParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params || {})) {
    if (value === null) {
      normalizedParams.append(key, 'null');
    } else if (value !== undefined) {
      normalizedParams.append(key, value.toString());
    }
  }

  return normalizedParams.size
    ? `/api/agora/delegates?${normalizedParams.toString()}`
    : '/api/agora/delegates';
};

export const getDelegates = async (
  params?: GetDelegatesParams,
  options?: RequestInit,
): Promise<getDelegatesResponse> => {
  return customFetch<Promise<getDelegatesResponse>>(
    getGetDelegatesUrl(params),
    {
      ...options,
      method: 'GET',
    },
  );
};

export function useGetDelegates() {
  return useQuery({
    queryKey: ['get-delegates'],
    queryFn: async () => {
      return getDelegates().then((r) => {
        return r?.data?.data;
      });
    },
  });
}
