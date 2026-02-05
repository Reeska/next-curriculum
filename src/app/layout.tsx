import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import type React from 'react'

import favicon from '../../public/favicon.png'

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata(): Metadata {
  return {
    title: `Thomas Champion - CV - ${new Date().toISOString().substring(0, 10)} - ${Math.random().toString(36).substring(2, 6)}`,
    description: 'Curriculum vitae',
    icons: {
      icon: favicon.src,
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
      <body className={`${inter.className} bg-gray-200 print:bg-white`}>
        <div className="w-[210mm] min-h-[297mm] print:min-h-0 mx-auto my-5 print:my-0 p-[1cm] pb-0 bg-white shadow-lg print:shadow-none relative">
          <div className="absolute z-1 w-full h-[3.3cm] top-0 left-0 bg-secondary/20"></div>
          <span className="absolute left-1 top-1 text-gray-300">
            &lt;cv&gt;
          </span>
          <span className="absolute right-1 bottom-0 text-gray-300">
            &lt;/cv&gt;
          </span>
          {children}
        </div>
      </body>
    </html>
  )
}
