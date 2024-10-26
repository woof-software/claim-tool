import ClaimButton from '@/components/ClaimButton';
import ClaimsList from '@/components/ClaimsList';
import ConnectButton from '@/components/ConnectButton';
import React from 'react';

const Home = () => {
  return (
    <div>
      <ConnectButton />
      <ClaimButton />
      <ClaimsList />
    </div>
  );
};

export default Home;
