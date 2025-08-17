import type { Metadata } from 'next';
import { DM_Sans,Montserrat } from 'next/font/google';
import '@/app/globals.css';

const dmSans = DM_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Page for Sign in',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={` ${dmSans.variable} ${montserrat.variable}`}>
    
        {children}
    </main>
  );
}
