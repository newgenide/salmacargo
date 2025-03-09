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

    <Script
          id="smartsupp-live-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window._smartsupp = window._smartsupp || {};
              window._smartsupp.key = '8ddfe529d6f36eaf2cf131a3fee7abb737afa36b';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';
                s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
    </>
  )
}
