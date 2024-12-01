import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { NextRequest } from 'next/server';

export type GrantClaimRow = {
  claimUid: string;
  grantTitle: string;
  grantDescription: string;
};

const generateRowsFromCsv = (csv: string) => {
  const rows = csv.split('\n');
  return rows.map((row) => row.split(','));
};

const parseCsvFile = (csv: string) => {
  const rows = generateRowsFromCsv(csv);
  const headers = rows[0];
  const data = rows.slice(1);

  const grantClaimRows: GrantClaimRow[] = [];
  for (const row of data) {
    const [claimUid, grantTitle, grantDescription] = row;
    grantClaimRows.push({
      claimUid,
      grantTitle,
      grantDescription,
    });
  }

  return { headers, data: grantClaimRows };
};

async function getGrantsCsv() {
  const files = await fs.readdir(path.join(process.cwd(), 'public/data'));
  const csvFiles = files.filter((file) => file.endsWith('.csv'));

  const data = await Promise.all(
    csvFiles.map(async (file) => {
      const response = await fs.readFile(
        path.join(process.cwd(), `public/data/${file}`),
      );
      return parseCsvFile(response.toString());
    }),
  );

  const headers = data[0].headers;
  const allData = data.flatMap((csv) => csv.data);

  return { headers, data: allData };
}

export async function GET(request: NextRequest) {
  const grants = await getGrantsCsv();
  return Response.json({ data: grants.data });
}
