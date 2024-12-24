import { useQuery } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import type { BucketItem } from 'minio';
import { SpinningLoader } from '../common/SpinningLoader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DeleteCsvButton } from './DeleteCsvButton';

export const StoredFilesList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['csv', 'list'],
    queryFn: async () => {
      const response = await fetch('/api/csv');
      return response.json() as Promise<{ files: BucketItem[] }>;
    },
  });

  if (isLoading) {
    return <SpinningLoader />;
  }

  if (!data) {
    return <div>No files found</div>;
  }

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Last modified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.files.map((file) => (
          <TableRow key={file.name}>
            <TableCell>{file.name}</TableCell>
            <TableCell>
              {file.lastModified
                ? new Date(file.lastModified).toLocaleString()
                : 'Unknown'}
            </TableCell>
            <TableCell className="text-right">
              <DeleteCsvButton fileName={file.name}>
                <Trash />
              </DeleteCsvButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
