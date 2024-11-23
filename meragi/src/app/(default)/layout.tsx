'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import { Work_Sans } from "next/font/google";

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <>
      <main className={work_sans.className}>
        {children}
      </main>

      <Footer />
    </>
  )
}