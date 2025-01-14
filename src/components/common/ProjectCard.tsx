import { Card, CardContent } from '@/components/ui/card';
import type { Grant } from '@/context/GrantsContext';

const ProjectCard = ({ grant }: { grant: Grant }) => {
  return (
    <Card className="w-full border-black shadow-none bg-transparent">
      <CardContent className="py-8 px-10 space-y-6">
        <p>Your project</p>
        <div className="flex items-center">
          <img
            className="h-[80px] mr-4"
            alt="Project logo"
            src={grant.projectImage}
          />
          <p className="text-lg font-semibold">{grant.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
