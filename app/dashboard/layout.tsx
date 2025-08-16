import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Author Dashboard",
  description: "Content management dashboard for authors",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={inter.className} >
    {children}
    </main>
  )
}

