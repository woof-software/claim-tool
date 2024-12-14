import React from 'react';
import type { Grant } from '../../context/GrantsContext';
import { Card, CardContent } from '../ui/card';

export const DaysUntilCard = ({ grant }: { grant: Grant }) => {
  if (!grant.tokenReleasedInDays) return null;
  return (
    <Card className="w-[424px] shadow-none bg-[#FFE6C7]">
      <CardContent className="py-2">
        <p className="flex justify-center">
          The token will be fully released in:
          <span className="font-bold ml-1">
            {grant.tokenReleasedInDays}{' '}
            {grant.tokenReleasedInDays === 1 ? 'day' : 'days'}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
