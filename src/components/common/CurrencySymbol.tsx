import { CircleHelp } from 'lucide-react';
import Image from 'next/image';

import type { HedgeyCampaign } from '@/hooks/useGetHedgeyCampaigns';
import { cn } from '@/lib/utils';
import ETH from '../../../public/currency_symbols/eth.png';
import OP from '../../../public/currency_symbols/op.png';
import POA from '../../../public/currency_symbols/poa.png';
import ZK from '../../../public/currency_symbols/zk_sync.png';

const getSrc = (currencyName?: string | null) => {
  console.log('currencyName', currencyName);
  switch (currencyName) {
    case 'ETH':
      return { src: ETH };
    case 'POA':
    case 'PLBR':
      return { src: POA };
    case 'OP':
      return { src: OP };
    case 'ZK':
      return { src: ZK, className: 'bg-white border border-black' };
    default:
      return null;
  }
};

export const CurrencySymbol = ({
  token,
}: { token: HedgeyCampaign['token'] }) => {
  if (!token) {
    return <CircleHelp />;
  }

  const result = getSrc(token?.ticker);

  if (!result) {
    return <CircleHelp />;
  }

  const { src, className } = result;

  return (
    <Image
      className={cn('rounded-full flex-shrink-0 flex relative', className)}
      alt={`${token?.name} Logo`}
      src={src}
      width={24}
      height={24}
    />
  );
};
