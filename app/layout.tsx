import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/Footer'
import { UserProvider } from '@/context/UserContext'
import { Toaster } from "react-hot-toast";
import { Header } from '@/components/Header'
import { Providers } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoDeal - Car Marketplace',
  description: 'Find your perfect car with AutoDeal - the ultimate car marketplace platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <main className="min-h-screen">
        <Toaster position="top-right" />
        <Providers>
          <UserProvider>
          <Header/>
          {children}
          </UserProvider>
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  )
}