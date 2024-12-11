import { Card, CardContent } from '../ui/card';

export default function InfoCard() {
  return (
    <Card className="w-[430px] h-[282px] bg-neutral-100 border-none shadow-none">
      <CardContent className="p-10">
        <p className="text-sm">
          The OP Claim tool is built with{' '}
          <span className="font-semibold">Hedgey</span>.
        </p>
      </CardContent>
    </Card>
  );
}
