import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { NextApiRequest, NextApiResponse } from 'next';

export type GrantClaimRow = {
  claimUid: string;
  grantTitle: string;
  grantDescription: string;
};

export type ResponseData = {
  data: GrantClaimRow[];
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

export const getGrantsCsv = async () => {
  // Find all CSV files in the public/data directory

  const files = await fs.readdir(path.join(process.cwd(), 'public/data'));
  console.log(files);

  // Filter out CSV files
  const csvFiles = files.filter((file) => file.endsWith('.csv'));

  // Read all CSVs from the public/data directory
  const data = await Promise.all(
    csvFiles.map(async (file) => {
      const response = await fs.readFile(
        path.join(process.cwd(), `public/data/${file}`),
      );
      // For every CSV, parse it into an array of objects
      return parseCsvFile(response.toString());
    }),
  );

  // Merge all data into a single object, one row of headers and all data
  const headers = data[0].headers;
  const allData = data.flatMap((csv) => csv.data);

  return { headers, data: allData };
};

export async function GET(
  request: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const grants = await getGrantsCsv();

  return new Response(JSON.stringify({ data: grants.data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
