'use client';

import ConnectButton from '@/components/auth/ConnectButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './common/images/Logo';
import { Button } from './ui/button';

const links = [
  {
    title: 'Grants',
    href: '/grants',
  },
  {
    title: 'Delegates',
    href: '/delegates',
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
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <Button
              className={`h-full rounded-none py-6 ${
                pathname === link.href
                  ? 'border-b-4 border-secondary-foreground'
                  : 'hover:border-b-4 hover:border-secondary-foreground'
              }`}
              variant={null}
              asChild
              key={link.href}
            >
              <Link className="font-semibold text-xl" href={link.href}>
                {link.title}
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
