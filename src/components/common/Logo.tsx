import Image from 'next/image';
import OpLogo from '../../../public/op-logo.svg';
const Logo = () => {
  return <Image src={OpLogo} alt="OP Logo" />;
};

export default Logo;
