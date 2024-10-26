import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
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

export default function ClaimCard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      delegateAddress: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  return (
    <Card className="border border-neutral-200 shadow-none p-10 max-w-[634px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <p className="text-sm">
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
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="py-0">
            <Button variant="destructive">Delegate</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
