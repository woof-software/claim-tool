import type { VerifyTypedDataParameters } from 'viem/actions';
import { whitelistedAddresses } from '../../config/storage';
import { getPublicClientForChain } from './getPublicClientForChain';

export const verifySignature = async ({
  chainId = 1,
  ...verificationParams
}: {
  chainId?: number;
} & VerifyTypedDataParameters) => {
  const publicClient = getPublicClientForChain(chainId);

  if (!whitelistedAddresses.includes(verificationParams.address)) {
    return false;
  }

  return publicClient.verifyTypedData(verificationParams);
};
