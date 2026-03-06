import type { Metadata } from 'next'
import { Nunito, Nunito_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const display = Nunito({ subsets: ['latin'], variable: '--font-display', weight: ['400','500','600','700','800'] })
const sans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans', weight: ['400','500','600','700'] })

export const metadata: Metadata = {
  title: 'Keep — Notes that matter',
  description: 'Google Keep Clone — capture your thoughts, everywhere.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white font-sans antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { borderRadius: '8px', background: '#202124', color: '#fff', fontSize: '14px' },
            success: { iconTheme: { primary: '#4caf50', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
