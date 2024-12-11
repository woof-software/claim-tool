import { truncate } from '@/lib/truncate';
import Image from 'next/image';
import { type ComponentProps, useEffect, useState } from 'react';
import type { Address } from 'viem';
import { normalize } from 'viem/ens';
import { useEnsAvatar, useEnsName } from 'wagmi';
import avatarFallback from '../../public/op-avatar-fallback.svg';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function AvatarENS({
  address,
  ...props
}: { address: string } & ComponentProps<typeof Avatar>) {
  const { data: name } = useEnsName({
    address: address as Address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  });

  const { data: src } = useEnsAvatar({
    chainId: 1,
    name: normalize(name ?? ''),
    query: { enabled: Boolean(name) },
  });

  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (src) {
      setAvatar(src);
    }
  }, [src]);

  return (
    <Avatar {...props}>
      <AvatarImage src={avatar ?? ''} alt={name ?? address} />
      <AvatarFallback>
        <Image
          src={avatarFallback}
          alt="OP Avatar fallback"
          width={44}
          height={44}
        />
      </AvatarFallback>
    </Avatar>
  );
}

export function NameENS({
  address,
  truncateLength,
  ...props
}: {
  address?: string;
  truncateLength?: number;
} & ComponentProps<'div'>) {
  const { data: name } = useEnsName({
    address: address as Address,
    chainId: 1,
    query: { enabled: Boolean(address) },
  });

  const [ensName, setEnsName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (name) {
      setEnsName(name);
    }
  }, [name]);

  return (
    <div {...props} title={address}>
      {ensName ?? truncate(address, truncateLength)}
    </div>
  );
}
