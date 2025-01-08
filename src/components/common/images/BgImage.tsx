import Image from 'next/image';
import { FEATURES } from '../../../../config/features';

const BackgroundImage = ({
  className,
  src,
}: { className?: string; src: string }) => {
  return <Image className={className} src={src} alt="Background Image" fill />;
};

export default BackgroundImage;
