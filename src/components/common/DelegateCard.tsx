import { Markdown } from '@/components/common/Markdown';
import { Card, CardContent } from '@/components/ui/card';
import type { Delegate } from '@/context/DelegatesContext';
import { cn } from '@/lib/utils';
import {
  RiDiscordFill,
  RiFileCopyLine,
  RiHexagonLine,
  RiTwitterXLine,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Mirror from '../../../public/mirror.svg';
import { Button } from '../ui/button';

const DelegateCard = ({ delegate }: { delegate: Delegate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const lineHeight = Number.parseInt(
          getComputedStyle(contentRef.current).lineHeight,
        );
        const maxHeight = lineHeight * 3;
        setShowReadMore(contentRef.current.scrollHeight > maxHeight);
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Card key={delegate.address} className="border-none shadow-none p-8">
      <CardContent className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <RiHexagonLine className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="font-semibold text-xl flex items-center text-neutral-600">
              {delegate.address}
              <Button size="icon" variant="link">
                <RiFileCopyLine className="text-neutral-600 w-4 h-4" />
              </Button>
            </p>
            <div className="flex items-center gap-2 text-neutral-600">
              <Link href={`https://twitter.com/${delegate.twitter}`}>
                <RiTwitterXLine className="h-4 w-4" />
              </Link>
              <Link href={`https://discord.gg/${delegate.discord}`}>
                <RiDiscordFill className="w-4 h-4" />
              </Link>
              <Link href={`https://mirror.xyz/${delegate.mirror}`}>
                <Image src={Mirror} alt="Mirror" width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className={cn('w-full', !isExpanded && 'line-clamp-3')}
        >
          <Markdown>{delegate.description}</Markdown>
        </div>
        {showReadMore && (
          <Button variant="link" className="p-0" onClick={toggleExpand}>
            {isExpanded ? 'Read less' : 'Read more'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DelegateCard;
