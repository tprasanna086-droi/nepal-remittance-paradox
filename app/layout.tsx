import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import LoadingScreen from '@/components/LoadingScreen'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nepal Remittance Paradox | Agricultural Study',
  description: 'District-level analysis of remittance flows and agricultural productivity across Nepal\'s 75 districts.',
  icons: {
    icon: '/favicon.svg',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
