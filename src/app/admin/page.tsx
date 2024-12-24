'use client';

import { StoredFilesList } from '@/components/admin/StoredFilesList';
import { UploadCsvButton } from '@/components/admin/UploadCsvButton';
import { useAccount } from 'wagmi';
import { whitelistedAddresses } from '../../../config/storage';

const AdminPage = () => {
  const { address, isConnecting } = useAccount();

  if (isConnecting) {
    return <p>Connecting...</p>;
  }

  if (!address) {
    return null;
  }

  if (!whitelistedAddresses.includes(address)) {
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Sorry, you are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <UploadCsvButton />
      <StoredFilesList />
    </div>
  );
};

export default AdminPage;
