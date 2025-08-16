import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import '../globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});



export const metadata: Metadata = {
  title: 'Stack Stories',
  description: '"Stack Stories" by Ahmed Ashraf El-Gendy shares real-world lessons from building modern applications. Drawing on experience in React, Next.js, TypeScript, Spring Boot, and SQL, Ahmed blends technical depth with practical insights from internships, projects, and constant self-improvement. This blog explores not just the tools in the stack, but the stories and challenges behind them.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
      <link rel="icon" href="/logo2.ico" sizes="any" />
      </head>
      <body>

    <main className={`${dmSans.variable}   `}>
        {/* <Navbar/> */}
        {children}
        {/* <Footer/> */}
 
    </main>
      </body>
    </html>

  );
}
