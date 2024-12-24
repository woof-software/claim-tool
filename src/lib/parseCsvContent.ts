import { parse } from 'csv-parse/sync';

export const parseCsvContent = (csvContent: Parameters<typeof parse>[0]) => {
  const results = parse(csvContent, {
    delimiter: '	',
    // Trim all trailing :'s on object keys
    columns: (headers) =>
      headers.map((column: string) => column.replace(/:$/, '')),
    trim: true,
  }) as { UUID?: string; Title?: string }[];
  return results;
};
