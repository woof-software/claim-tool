'use client';

import { getToken, setToken } from '@/lib/token';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { decodeJwt } from 'jose';
import ky from 'ky';
import { useRouter } from 'next/navigation';
import type { Address } from 'viem';
import { useDisconnect as useWagmiDisconnect } from 'wagmi';

export function useNonce() {
  return useQuery({
    queryKey: ['nonce'],
    queryFn: async () => ky.get('/api/agora/auth/nonce').text(),
  });
}

export function useVerify() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (json: {
      message: string;
      signature: string;
      nonce: string;
    }) => {
      const { access_token, ...rest } = await ky
        .post('/api/agora/auth/verify', { json })
        .json<{ access_token: string }>();
      setToken(access_token);
      // Trigger a refetch of the session
      await client.invalidateQueries({ queryKey: ['session'] });
      return { access_token };
    },
  });
}

export function useDisconnect() {
  const client = useQueryClient();
  const router = useRouter();
  const wagmiDisconnect = useWagmiDisconnect();

  async function disconnect() {
    wagmiDisconnect.disconnect();
    global?.localStorage?.removeItem('token');
    await client.invalidateQueries({ queryKey: ['session'] });
    router.push('/');
  }

  return { disconnect };
}

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const accessToken = getToken();
      const user = accessToken
        ? decodeJwt<{
            siwe: { address: Address };
          }>(accessToken)
        : null;
      return user;
    },
  });
}
