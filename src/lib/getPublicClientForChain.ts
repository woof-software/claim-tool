import { http, type Chain, createPublicClient } from 'viem';
import { sepolia } from 'viem/chains';

const getRpcUrlForChain = (chain: Chain) => {
  switch (chain.id) {
    case sepolia.id:
      return 'https://ethereum-sepolia-rpc.publicnode.com';
    default:
      throw new Error(`Unsupported chain: ${chain}`);
  }
};

export const getPublicClientForChain = (chain: Chain) => {
  return createPublicClient({
    transport: http(getRpcUrlForChain(chain)),
    chain,
  });
};
