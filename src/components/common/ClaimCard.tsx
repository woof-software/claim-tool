import type { Grant } from '@/context/GrantsContext';
import useContractClaimAndDelegate from '@/hooks/useContractClaimAndDelegate';
import { useGetClaim } from '@/hooks/useGetClaim';
import { useToast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiArrowRightUpLine } from '@remixicon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
} from 'viem';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { DialogClose } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import SuccessCheckmark from './images/SuccessCheckmark';

const FormSchema = z.object({
  delegateAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid Ethereum address format.',
  }),
});

export default function ClaimCard({ grant }: { grant: Grant }) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { toast } = useToast();
  const [delegateAddress, setDelegateAddress] = useState('');
  const { claim } = useGetClaim({
    uuid: grant.id,
  });
  const { mutateAsync: claimAndDelegate, isPending } =
    useContractClaimAndDelegate();

  // TODO: Enable ENS
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      delegateAddress: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setDelegateAddress(data.delegateAddress);
    setStep(2);
  }

  async function handleClaim() {
    if (!claim) {
      toast({
        title: 'Error',
        description: 'Claim not found',
        variant: 'destructive',
      });
      return;
    }
    try {
      await claimAndDelegate({
        delegateeAddress: delegateAddress as `0x${string}`,
        claim,
      });
      toast({
        title: 'Success',
        description: 'Rewards claimed successfully',
      });
      setStep(3);
    } catch (error) {
      // @ts-expect-error this error is spreadable
      console.error('Error claiming rewards:', { ...error });
      if (error instanceof ContractFunctionExecutionError) {
        if (error.cause instanceof ContractFunctionRevertedError) {
          toast({
            title: 'Contract error',
            description: error.cause.reason,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Contract error',
          description: 'An error occurred while claiming rewards',
          variant: 'destructive',
        });
      }
    }
  }

  function handleClose() {
    console.log('Closing the claim process');
    router.push('/grants');
  }

  return (
    <Card className="bg-transparent border border-neutral-300 shadow-none p-10 w-[634px]">
      {step === 1 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <p className="text-lg">
                To claim the milestone, you must appoint a delegate first.
              </p>
              <Link
                className="group flex items-center font-semibold text-lg text-black"
                href="https://vote.optimism.io/delegates"
                target="_blank"
              >
                View all the delegate profiles
                <RiArrowRightUpLine
                  className="ml-1 w-4 h-4 opacity-70 transition-transform duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
              <div className="grid w-full max-w-sm items-center gap-3">
                <FormField
                  control={form.control}
                  name="delegateAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the delegate's address</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-transparent border-neutral-300"
                          placeholder="0x..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="py-0">
              <Button
                type="submit"
                variant="destructive"
                disabled={!form.formState.isValid}
              >
                Delegate
              </Button>
            </CardFooter>
          </form>
        </Form>
      ) : step === 2 ? (
        <>
          <CardContent className="space-y-6">
            <p className="text-lg">
              Excellent. You are now ready to claim your rewards
            </p>
          </CardContent>
          <CardFooter className="py-0">
            <Button
              onClick={handleClaim}
              variant="destructive"
              disabled={isPending}
            >
              Claim
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="p-0 space-y-6 flex flex-col items-center">
            <p className="text-lg">All done!</p>
            <SuccessCheckmark />
            <DialogClose asChild>
              <Button onClick={handleClose} variant="outline">
                Close
              </Button>
            </DialogClose>
          </CardContent>
        </>
      )}
    </Card>
  );
}
