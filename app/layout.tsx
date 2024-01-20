import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { ConvexClientProvider } from '@/components/provider/convex-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'Productivity app ',
  icons: [{
    media: '(prefers-color-scheme: dark)',
    url:"/logo-dark.svg",
    href: '/logo-dark.svg',
  },
  {
    media: '(prefers-color-scheme: light)',
    url:"/logo.svg",
    href: '/logo.svg',
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
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="jotion-theme">
          <Toaster position='bottom-center'/>
          {children}
          </ThemeProvider>
        </ConvexClientProvider>
        </body>
    </html>
  )
}
