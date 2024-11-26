import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import OPLogo from '../../../public/op.svg';
import ClaimButton from '../ClaimButton';

interface ProjectCardProps {
  title?: string;
  projectCount?: number;
  totalAwarded?: number;
  remainingAmount?: number;
  grantIds?: string[];
}

const ProjectCard = ({
  projectCount = 1,
  totalAwarded = 30000,
  remainingAmount = 2000,
  grantIds = ['1'],
}: ProjectCardProps) => {
  return (
    <Card className="w-[424px] border-black shadow-none bg-transparent">
      <CardContent className="py-8 px-10 space-y-6">
        <div className="flex items-center justify-between">
          <p>Awarded project</p>
          <p className="text-lg font-semibold">{projectCount}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Total awarded amount</p>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full flex-shrink-0 flex relative"
              alt="OP Logo"
              src={OPLogo}
              width={24}
              height={24}
            />
            <p className="text-lg font-semibold">
              {totalAwarded.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Remaining/Unclaimed</p>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full flex-shrink-0 flex relative"
              alt="OP Logo"
              src={OPLogo}
              width={24}
              height={24}
            />
            <p className="text-lg font-semibold">
              {remainingAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <ClaimButton grantIds={grantIds} />
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
