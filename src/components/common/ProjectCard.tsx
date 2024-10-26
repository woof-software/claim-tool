import { Hexagon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function ProjectCard({ title }: { title?: string }) {
  return (
    <Card className="w-[430px] h-[212px] bg-neutral-100 border-none shadow-none">
      <CardContent className="p-10">
        <h2 className="text-xl font-bold mb-6">Your Project</h2>
        <div className="flex items-center gap-2">
          <Hexagon className="w-10 h-10" />
          {title && <p className="text-xl font-semibold">{title}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
