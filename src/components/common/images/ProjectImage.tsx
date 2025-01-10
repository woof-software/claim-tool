import { Hexagon } from 'lucide-react';

export const ProjectImage = ({ src: image }: { src?: string }) => {
  if (image) {
    return <img src={image} alt="Project logo" className="w-10 h-10" />;
  }

  return <Hexagon className="w-10 h-10" />;
};
