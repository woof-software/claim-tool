'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-20 px-3">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
