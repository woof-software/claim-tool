import type { NextApiRequest, NextApiResponse } from 'next';

// Get claims data by reading from the localy available CSV
// https://api.hedgey.finance/token-claims/proof/{uuid}/{address}
// Below is a response example, if the wallet can carry out a claim.
//
// {
//     "canClaim": true,
//     "proof": [
//     "0x1f14d0d899eb52d9467e3d3888cc2741d4d915ff13e29a1aac99dfcfea6a0d0f",
//     "0x54ada740ae82a2249e2ce9827394e765937e62a128f25045605c255ea7d42f24",
//     "0xbf3ee7814439a23ac477953252877c633372fe8c7fde8c0d2ece57a4eca3904f",
//     "0x5db1bea240bf7d6de115167e18e2d88e070e79e859a326b6bf7b4e21947a8302"
// ],
//     "amount": "1000000000000000000"
// }
//
// Below is a response example, if the wallet cannot carry out a claim.
//
// {
//     "canClaim": false,
//     "amount": "0"
// }

export type Claim = {
  canClaim: boolean;
  proof?: string[];
  amount: string;
};

export type ResponseData = {
  data: Claim;
};

const generateMockClaim = (size = 5): Claim => {
  const canClaim = Math.random() > 0.5;
  const proof = canClaim
    ? undefined
    : [
        '0x1f14d0d899eb52d9467e3d3888cc2741d4d915ff13e29a1aac99dfcfea6a0d0f',
        '0x54ada740ae82a2249e2ce9827394e765937e62a128f25045605c255ea7d42f24',
        '0xbf3ee7814439a23ac477953252877c633372fe8c7fde8c0d2ece57a4eca3904f',
        '0x5db1bea240bf7d6de115167e18e2d88e070e79e859a326b6bf7b4e21947a8302',
      ];
  const amount = '1000000000000000000';

  return {
    canClaim,
    proof,
    amount,
  };
};

export async function GET(
  request: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (!request.url) {
    return new Response(JSON.stringify({ error: 'url is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const uuid = searchParams.get('uuid');
  // get wallet address from search params
  if (!address) {
    return new Response(JSON.stringify({ error: 'address is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!uuid) {
    return new Response(JSON.stringify({ error: 'uuid is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const claim = generateMockClaim();
  // https://api.hedgey.finance/token-claims/proof/{uuid}/{address}
  // console.log(`Calling Hedgey API for uuid: ${uuid} and address: ${address}`);
  // const claims = await fetch(`https://api.hedgey.finance/token-claims/proof/${uuid}/${address}`);

  console.log(claim);

  return new Response(JSON.stringify({ data: claim }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
