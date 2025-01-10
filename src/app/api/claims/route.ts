import type { NextRequest } from 'next/server';

export type Claim = {
  uuid: string;
  address: string;
  canClaim: boolean;
  proof?: `0x${string}`[];
  amount: string;
  claimFee: string;
};

export type ResponseData = {
  data: Claim;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const uuid = searchParams.get('uuid');

  if (!address) {
    return Response.json({ error: 'address is required' }, { status: 400 });
  }

  if (!uuid) {
    return Response.json({ error: 'uuid is required' }, { status: 400 });
  }

  const [claim, claimInfo] = await Promise.all([
    fetch(
      `https://api.hedgey.finance/token-claims/proof/${uuid}/${address}`,
    ).then((res) => res.json()),
    fetch(`https://api.hedgey.finance/token-claims/info/${uuid}`).then((res) =>
      res.json(),
    ),
  ]);

  const result = {
    ...claim,
    claimFee: claimInfo.claimFee,
  };

  return new Response(JSON.stringify({ data: result }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
