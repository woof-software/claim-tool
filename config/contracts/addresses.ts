import { mainnet, optimism, sepolia } from 'wagmi/chains';

export const hedgeyContractAddresses = {
  [optimism.id]: '0x5Ae97e4770b7034C7Ca99Ab7edC26a18a23CB412',
  [mainnet.id]: '0x8A2725a6f04816A5274dDD9FEaDd3bd0C253C1A6',
  [sepolia.id]: '0x8A2725a6f04816A5274dDD9FEaDd3bd0C253C1A6',
} as Record<number, `0x${string}`>;
