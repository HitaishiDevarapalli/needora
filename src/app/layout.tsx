import type { Metadata } from 'next';
import './globals.css';
import RoleBar from '@/components/RoleBar';
import MobileBottomNav from '@/components/MobileBottomNav';
import DoraAIWidget from '@/components/DoraAIWidget';

export const metadata: Metadata = {
  title: 'Needora — Find. Connect. Get It Done',
  description: 'From local services to offline shops, Needora connects you with trusted providers — making your life easier, faster and smarter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-brand-500 selection:text-white pb-16 md:pb-0">
        <RoleBar />
        {children}
        <DoraAIWidget />
        <MobileBottomNav />
      </body>
    </html>
  );
}
