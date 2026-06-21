import type { Metadata } from 'next';
import './globals.css';
import LayoutClientWrapper from './layout-client';

export const metadata: Metadata = {
  title: 'Fitex Gym',
  description: 'Welcome to Fitex Gym - Elite training facility',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D]">
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
