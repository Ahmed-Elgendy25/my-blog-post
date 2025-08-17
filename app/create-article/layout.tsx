import { Toaster } from '@/components/ui/sonner';
import '../globals.css';

export const metadata = {
  title: 'Create Your Article',
  description: 'Page for Creating, Generating, And Publishing Articles',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    
    
        {children}
        <Toaster />
      
    </>
  )
}
