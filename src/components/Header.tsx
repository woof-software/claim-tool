'use client';

import ConnectButton from '@/components/auth/ConnectButton';
import { RiArrowRightUpLine } from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './common/images/Logo';
import { Button } from './ui/button';

const links = [
  {
    title: 'Grants',
    href: '/grants',
    isExternal: false,
  },
  {
    title: 'Delegates',
    href: 'https://vote.optimism.io/delegates',
    isExternal: true,
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="h-20 bg-white border-b border-neutral-200">
      <div className="h-full mx-auto max-w-5xl flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Button
              className={`h-full rounded-none py-6 group relative ${
                pathname === link.href
                  ? 'border-b-4 border-secondary-foreground'
                  : 'before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:bg-secondary-foreground before:transform before:scale-x-0 before:origin-right hover:before:scale-x-100 hover:before:origin-left before:transition-transform before:duration-300 before:ease-out'
              }`}
              variant={null}
              asChild
              key={link.href}
            >
              <Link
                className="flex items-center font-semibold text-xl"
                href={link.href}
                target={link.isExternal ? '_blank' : '_self'}
              >
                {link.title}
                {link.isExternal && (
                  <RiArrowRightUpLine
                    className="ml-1 w-6 h-6"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </Button>
          ))}
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
