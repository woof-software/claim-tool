import Image from 'next/image';
import BgImage from '../../../../public/bg-img.svg';

const BackgroundImage = ({ className }: { className?: string }) => {
  return (
    <Image className={className} src={BgImage} alt="Background Image" fill />
  );
};

export default BackgroundImage;
