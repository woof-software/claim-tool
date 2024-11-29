import type { Grant } from '@/context/GrantsContext';
import useContractClaimAndDelegate from '@/hooks/useContractClaimAndDelegate';
import { useGetClaim } from '@/hooks/useGetClaim';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

const FormSchema = z.object({
  delegateAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid Ethereum address format.',
  }),
});

const claimId = 'e23db1a6-3a9b-48bf-8a06-bb39c2298435';
export default function ClaimCard({ grant }: { grant: Grant }) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [delegateAddress, setDelegateAddress] = useState('');
  console.log(grant);
  const { claim } = useGetClaim({
    uuid: grant.id,
  });
  const { mutateAsync: claimAndDelegate } = useContractClaimAndDelegate();

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
      console.error('Claim not found');
      return;
    }
    console.log('Claiming rewards for delegate:', delegateAddress);
    await claimAndDelegate({
      claimId,
      delegateeAddress: delegateAddress as `0x${string}`,
      claim,
    });
    console.log('done');
    // setStep(3);
  }

  function handleClose() {
    console.log('Closing the claim process');
    router.push('/grants');
  }

  return (
    <Card className="bg-transparent border border-neutral-300 shadow-none p-10 max-w-[634px]">
      {step === 1 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <p className="text-lg">
                To claim the milestone, you must appoint a delegate first. You
                could view all the delegate profiles{' '}
                <span className="font-semibold">here</span>.
              </p>
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
              <Button type="submit" variant="destructive">
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
            <Button onClick={handleClaim} variant="destructive">
              Claim
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="space-y-6">
            <p className="text-lg">
              All done! Your rewards have been successfully claimed.
            </p>
          </CardContent>
          <CardFooter className="py-0">
            <DialogClose asChild>
              <Button onClick={handleClose} variant="outline">
                Close
              </Button>
            </DialogClose>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
