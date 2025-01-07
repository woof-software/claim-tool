import BackgroundImage from '@/components/common/images/BgImage';
import { Toaster } from '@/components/ui/toaster';
import ContextProvider from '@/context';
import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import { inter, sora } from './fonts';
import './globals.css';
import { FEATURES } from '../../config/features';

export const metadata: Metadata = {
  title: FEATURES.APP_NAME,
  description: 'Powered by WalletConnect',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-secondary">
        <ContextProvider>
          <ClientLayout>{children}</ClientLayout>
        </ContextProvider>
        <div className="fixed inset-0 w-full h-full -z-10 flex items-center justify-center">
          <BackgroundImage className="object-cover" />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
