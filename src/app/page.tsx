import ClaimButton from '@/components/ClaimButton';
import ClaimsList from '@/components/ClaimsList';
import ConnectButton from '@/components/ConnectButton';
import GrantsList from '@/components/GrantsList';
import React from 'react';

const Home = () => {
  return (
    <div>
      <ConnectButton />
      <ClaimButton />
      <ClaimsList />
      <GrantsList />
    </div>
  );
};

export default Home;
