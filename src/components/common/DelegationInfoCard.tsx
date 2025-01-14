import { Card, CardContent } from '../ui/card';

export default function DelegationInfoCard() {
  return (
    <Card className="w-[430px] h-[282px] bg-neutral-100 border-none shadow-none">
      <CardContent className="p-10">
        <h2 className="text-xl font-bold mb-6">Why delegate?</h2>
        <p className="text-sm">
          The OP Claim tool is built with{' '}
          <span className="font-semibold">Hedgey</span>. To allow project
          builders to claim their tokens, we use a delegation contract.
          Additionally, all project builders can choose to delegate themselves
          in this process.
        </p>
      </CardContent>
    </Card>
  );
}
