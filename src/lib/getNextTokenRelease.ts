import type { HedgeyCampaign } from '@/hooks/useGetHedgeyCampaigns';

export const getNextTokenReleaseTimestamp = (
  claimLockup: HedgeyCampaign['claimLockup'],
) => {
  if (!claimLockup) return null;
  const currentTimeStamp = new Date().getTime() / 1000;
  const periods = claimLockup.periods || 0;
  const start = Number(claimLockup.start);
  const periodDuration = Number(claimLockup.period);

  for (let i = 0; i < periods; i++) {
    const periodStart = start + i * periodDuration;
    if (periodStart > currentTimeStamp) {
      return {
        nextReleaseTimestamp: periodStart,
        period: i + 1,
        daysUntilNextRelease: Math.ceil(
          (periodStart - currentTimeStamp) / 86400,
        ),
      };
    }
  }
};
