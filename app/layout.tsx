import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/provider/theme-provider'
import { ConvexClientProvider } from '@/components/provider/convex-provider'
import { ModalProvider } from '@/components/provider/model-provider'
import { EdgeStoreProvider } from '@/lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zotion',
  description: 'Productivity app ',
  icons: [{
    media: '(prefers-color-scheme: dark)',
    url:"/logoz-light.png",
    href: '/logoz-light.png',
  },
  {
    media: '(prefers-color-scheme: light)',
    url:"/logoz-dark.png",
    href: '/logoz-dark.png',
  }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="jotion-theme">
          <Toaster position='bottom-center'/>
          <ModalProvider />
          {children}
          </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
        </body>
    </html>
  )
}
