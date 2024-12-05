import { Card, CardContent } from '@/components/ui/card';
import type { Grant } from '@/context/GrantsContext';
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

const ProjectCard = ({ grant }: { grant: Grant }) => {
  return (
    <Card className="w-[424px] border-black shadow-none bg-transparent">
      <CardContent className="py-8 px-10 space-y-6">
        <p>Your project</p>
        <div className="flex items-center">
          <img
            className="h-[80px] mr-4"
            alt="Project logo"
            src="https://s3-alpha-sig.figma.com/img/685a/d643/05f04d7ff70b568228d7a30162da101b?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MVZe8gR3WzACmBfr~-HwRsKwQBr-mj2NLvgijPDeEdVB-d79EOtvxuSO~Ii1f08Ggk8BlBW7AH1PzsYLfTi44cDSOA5tzLuYgdKzsgS7ZED~k9lkCN2BBnVRSNHTuh4PRyY1k~VLPVy8K8rIKHPmpMq9gXFbIYJ06bCRvpgEKISQRR7njpZBiu3KaUThOGS2MnQaC-YtITalqNZEpxPjKHfADnXjX66iA5GZo1wQA5sQATzWIlycdmH0d7JGV~Zg4Q6nUvbCwCstL1Og0z2qA9vcxrez2EvRi8tPK6LIFTGLO-OHmw8v~GjhnPFycRoq8bWDffq0lmB-iZGCSztBsw__"
          />
          <p className="text-lg font-semibold">{grant.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
