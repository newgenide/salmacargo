import { Inter } from 'next/font/google'
import './globals.css'
import { SiteProvider } from '@/context/SiteContext'
import { getSiteMetadata } from '@/utils/metadata'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const { siteName, description } = await getSiteMetadata();
  
  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description,
    icons: {
      icon: '/favicon.ico',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  )
}
