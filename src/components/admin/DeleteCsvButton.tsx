import { toast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useAccount, useSignTypedData } from 'wagmi';
import { Button, type ButtonProps } from '../ui/button';

export const DeleteCsvButton = ({
  fileName,
  ...buttonProps
}: { fileName?: string } & ButtonProps) => {
  const { signTypedDataAsync } = useSignTypedData();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteFile, isPending } = useMutation({
    mutationKey: ['csv', 'delete'],
    mutationFn: async ({ fileName }: { fileName?: string }) => {
      if (!fileName) {
        throw new Error('No file name provided');
      }
      const signature = await signTypedDataAsync({
        types: {
          DeleteFile: [{ name: 'fileName', type: 'string' }],
        },
        primaryType: 'DeleteFile',
        message: { fileName },
      });
      const response = await fetch('/api/csv', {
        method: 'DELETE',
        body: JSON.stringify({ fileName, signature, address }),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error);
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'CSV successfully deleted',
        variant: 'default',
      });
      queryClient.invalidateQueries({
        queryKey: ['csv', 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: ['grants'],
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error deleting file',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <Button
      {...buttonProps}
      variant={'destructive'}
      disabled={isPending}
      onClick={() => deleteFile({ fileName })}
    >
      <Trash />
    </Button>
  );
};
