'use client';

import { Github } from 'lucide-react';
import Link from 'next/link';
import Gitcoin from './common/Gitcoin';
import RaidGuild from './common/Raid-Guild';

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

const Footer = () => {
  return (
    <div className="h-24 border-t border-neutral-200 mt-40">
      <div className="h-full mx-auto max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Gitcoin />
          </Link>
          <Link href="/">
            <RaidGuild />
          </Link>
        </div>
        <Link
          href="https://github.com/grants-stack-frontier/op-claim-tool"
          target="_blank"
        >
          <Github className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
