import { CircleHelp } from 'lucide-react';
import Image from 'next/image';

import type { HedgeyCampaign } from '@/hooks/useGetHedgeyCampaigns';
import ETH from '../../../public/currency_symbols/eth.png';
import POA from '../../../public/currency_symbols/poa.png';

const getSrc = (currencyName?: string | null) => {
  switch (currencyName) {
    case 'ETH':
      return ETH;
    case 'POA':
    case 'PLBR':
      return POA;
    default:
      return undefined;
  }
};

export const CurrencySymbol = ({
  token,
}: { token: HedgeyCampaign['token'] }) => {
  if (!token) {
    return <CircleHelp />;
  }

  const src = getSrc(token?.ticker);

  if (!src) {
    return <CircleHelp />;
  }

  return (
    <Image
      className="rounded-full flex-shrink-0 flex relative"
      alt={`${token?.name} Logo`}
      src={src}
      width={24}
      height={24}
    />
  );
};
