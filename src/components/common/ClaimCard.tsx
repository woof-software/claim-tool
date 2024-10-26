import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function ClaimCard() {
  return (
    <Card className="border border-neutral-200 shadow-none p-10 max-w-[634px]">
      <CardContent className="space-y-6">
        <p className="text-sm">
          To claim the milestone, you must appoint a delegate first. You could
          view all the delegate profiles{' '}
          <span className="font-semibold">here</span>.
        </p>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="delegate-address">Enter the delegate's address</Label>
          <Input id="delegate-address" type="text" placeholder="0x..." />
        </div>
      </CardContent>
      <CardFooter className="py-0">
        <Button variant="destructive">Delegate</Button>
      </CardFooter>
    </Card>
  );
}
