import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ServiceWorkerProvider from '@/providers/ServiceWorkerProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import { SocketProvider } from '@/context/socket.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentoria',
  description: 'Code mentoring application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SocketProvider>
          <ReduxProvider>
            <ServiceWorkerProvider>{children}</ServiceWorkerProvider>
          </ReduxProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
