import type { Metadata } from 'next';
import './globals.css';
import RoleBar from '@/components/RoleBar';

export const metadata: Metadata = {
  title: 'Needora — Find. Book. Get It Done',
  description: 'From local services to online solutions, Needora connects you with trusted providers — making your life easier, faster and smarter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <RoleBar />
        {children}
      </body>
    </html>
  );
}
