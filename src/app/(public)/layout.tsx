import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'


export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
    <Navbar/>
    {children}
    <Footer/>

    <Script src="//code.tidio.co/maqsuudmfh44liytsxxhmdvpjb7s5nqe.js" async></Script>
    </>
  )
}
