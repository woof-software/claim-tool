import Image from 'next/image';
import BgImage from '../../../public/bg-img.svg';

const BackgroundImage = () => {
  return <Image src={BgImage} alt="Background Image" fill />;
};

export default BackgroundImage;
