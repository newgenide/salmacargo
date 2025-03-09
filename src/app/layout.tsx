import { Inter } from 'next/font/google'
import './globals.css'
import { SiteProvider } from '@/context/SiteContext'
import { getSiteMetadata } from '@/utils/metadata'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  return {
    title: "Salma Cargo - Reliable Shipping Solutions",
    description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Cargo.",
    openGraph: {
      title: "Salma Cargo - Reliable Shipping Solutions",
      description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Cargo.",
      url: "https://www.salmacargo.com", // Update with your actual domain
      type: "website",
      images: [
        {
          url: "/logo.png", // Ensure this is in the `public` folder
          width: 1200,
          height: 630,
          alt: "Salma Cargo Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Salma Cargo - Reliable Shipping Solutions",
      description: "Efficient and secure cargo shipping services tailored to your needs. Experience hassle-free logistics with Salma Cargo.",
      images: ["/logo.png"],
    },
  };
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
