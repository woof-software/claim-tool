import type { ApiCsvResult } from '@/app/api/csv/route';
import { useQuery } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import type { BucketItem } from 'minio';
import { useState } from 'react';
import { SpinningLoader } from '../common/SpinningLoader';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { DeleteCsvButton } from './DeleteCsvButton';

export const StoredFilesList = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['csv', 'list'],
    queryFn: async () => {
      const response = await fetch('/api/csv');
      return response.json() as Promise<{
        files: ApiCsvResult[];
      }>;
    },
  });

  if (isLoading) {
    return <SpinningLoader />;
  }

  if (!data) {
    return <div>No files found</div>;
  }

  const handleRowClick = (fileName: string) => {
    setSelectedFile(selectedFile === fileName ? null : fileName);
  };

  const selectedFileData = data.files.find(
    (file) => file.name === selectedFile,
  );

  return (
    <div className="space-y-4">
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.files.map((file) => (
            <TableRow
              key={file.name}
              className={`w-full cursor-pointer hover:bg-gray-100 ${
                selectedFile === file.name ? 'bg-gray-200' : ''
              }`}
              onClick={() => file.name && handleRowClick(file.name)}
            >
              <TableCell>
                {file.name?.substring(file.name.indexOf('/') + 1)}
              </TableCell>
              <TableCell>
                {file.lastModified
                  ? new Date(file.lastModified).toLocaleString()
                  : 'Unknown'}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <DeleteCsvButton fileName={file.name}>
                    <Trash />
                  </DeleteCsvButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedFile &&
        (selectedFileData?.contents?.length ? (
          <Table className="bg-white rounded-lg">
            <TableHeader>
              <TableRow>
                {Object.keys(selectedFileData.contents[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedFileData.contents.map((row, index) => (
                <TableRow
                  key={row.UUID}
                  className={index % 2 === 0 ? 'bg-gray-50' : ''}
                >
                  {Object.keys(selectedFileData.contents[0]).map((key) => (
                    <TableCell key={key}>{row[key]?.toString()}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>{selectedFileData.name}</TableCaption>
          </Table>
        ) : (
          <div>No data found for this file</div>
        ))}
    </div>
  );
};
