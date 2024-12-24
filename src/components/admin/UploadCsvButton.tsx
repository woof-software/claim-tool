import { toast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';
import { Button } from '../ui/button';

export const UploadCsvButton = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { mutateAsync: uploadFile, isPending } = useMutation({
    mutationKey: ['csv', 'create'],
    mutationFn: async ({ file }: { file: File }) => {
      const fileHash = await window.crypto.subtle
        .digest('SHA-256', await file.arrayBuffer())
        .then((arrayBuffer) => {
          return btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
        });
      const signature = await signTypedDataAsync({
        types: {
          UploadFile: [{ name: 'hash', type: 'string' }],
        },
        primaryType: 'UploadFile',
        message: { hash: fileHash },
      });

      const data = new FormData();
      data.append('file', file);
      data.append('signature', signature);
      data.append('address', address);

      return fetch('/api/csv', {
        method: 'POST',
        body: data,
      }).then(async (response) => {
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.error);
        }
        return response.json();
      });
    },
    onSuccess: () => {
      if (ref.current) {
        ref.current.value = '';
      }
      queryClient.invalidateQueries({
        queryKey: ['csv', 'list'],
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error uploading file',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onClick = () => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    await uploadFile({ file });
  };

  return (
    <>
      <Button onClick={onClick}>Upload CSV</Button>
      <input
        disabled={isPending}
        accept=".csv"
        type="file"
        ref={ref}
        hidden
        multiple={false}
        onChange={onFileChange}
      />
    </>
  );
};
