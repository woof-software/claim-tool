'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SignMessage } from '@/components/auth/SignMessage';
import { SpinningLoader } from '@/components/common/SpinningLoader';
import { useSession } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnecting, isConnected } = useAccount();
  const { data: session, isLoading: isSessionLoading } = useSession();

  const showSignaturePrompt = isConnected && !isSessionLoading && !session;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 px-3">
        <div className="mx-auto max-w-5xl">
          {isConnecting || isSessionLoading ? (
            <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
              <SpinningLoader />
            </div>
          ) : showSignaturePrompt ? (
            <SignMessage />
          ) : (
            children
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
