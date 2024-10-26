'use client';

import ClaimCard from '@/components/common/ClaimCard';
import { Card, CardContent } from '@/components/ui/card';
import { useGrants } from '@/context/GrantsContext';
import { Hexagon } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { optimism } from 'viem/chains';

export default function GrantClaim({ params: { id = '' } }) {
  const { grants } = useGrants();
  const selectedGrant = useMemo(
    () => grants.find((g) => g.id === id && g.canClaim),
    [grants, id],
  );

  const { name } = optimism ?? {};
  const icon = `https://icons.llamao.fi/icons/chains/rsz_${name?.toLowerCase()}.jpg`;

  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20">
        <h1 className="text-4xl font-bold">You're claiming for</h1>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <span className="bg-neutral-200 rounded-md p-3">
            {selectedGrant?.title}
          </span>
          with
          <span className="bg-neutral-200 rounded-md p-3 flex items-center gap-2 w-fit">
            <Image
              className="rounded-full flex-shrink-0 flex relative"
              alt={`${name} Logo`}
              src={icon}
              width={20}
              height={20}
            />
            {selectedGrant?.grantAmount}
          </span>
        </h1>
        <div className="pt-14 flex items-start gap-14">
          <ClaimCard />
          <div className="flex flex-col gap-2">
            <Card className="w-[430px] h-[212px]">
              <CardContent className="p-10">
                <h2 className="text-xl font-bold mb-6">Your Project</h2>
                <div className="flex items-center gap-2">
                  <Hexagon className="w-10 h-10" />
                  <p className="text-xl font-semibold">
                    {selectedGrant?.title}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="w-[430px] h-[282px]">
              <CardContent className="p-10">
                <h2 className="text-xl font-bold mb-6">Why delegate?</h2>
                <p className="text-sm">
                  The OP Claim tool is built with{' '}
                  <span className="font-semibold">Hedgey</span>. To allow
                  project builders to claim their tokens, we use a delegation
                  contract. Additionally, all project builders can choose to
                  delegate themselves in this process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
