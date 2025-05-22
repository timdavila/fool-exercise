import type { Metadata } from "next"
import "~styles/globals.css"
import Head from "next/head"
import Footer from "~components/layout/footer"
import TopNav from "~components/layout/topNav"
import { AppProviders } from "./providers"


export const metadata: Metadata = {
  title: "Next Test Template",
  description: "Template for Next.js test projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <html lang="en">
          <Head>
            <title>Motley UFO</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="charset" content="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <body className="min-h-screen bg-gradient-to-b from-black via-blue-900 to-black text-blue-100 p-8">
            <TopNav/>
            <div className="w-full mx-12 lg:mx-0 my-12 flex items-center justify-center">
              <AppProviders>
                {children}
              </AppProviders>
            </div>
            <Footer/>
          </body>
        </html>
  )
}
