'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { mainnet, optimism, optimismSepolia, sepolia } from 'wagmi/chains';
import { GrantsProvider } from './GrantsContext';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('WalletConnect Project ID is not defined');
}

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'OP Claim Tool',
  projectId,
  chains: [mainnet, optimism, optimismSepolia, sepolia],
  ssr: true,
});

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <GrantsProvider>{children}</GrantsProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
