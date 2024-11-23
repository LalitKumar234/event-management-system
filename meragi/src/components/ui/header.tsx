'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Pacifico } from "next/font/google";
import MobileMenu from './mobile-menu'
import { Button } from '@/components/ui/button'

const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});
export default function Header() {

  const [top, setTop] = useState<boolean>(true)
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className={pacifico.className}>
            <div className='text-4xl'>dineo<span className='text-primary'>.in</span></div>
          </div>
          <nav className="hidden md:flex md:grow">
            <ul className="flex grow justify-end flex-wrap items-center gap-x-5">
              <li>
                <Link href="/" className="flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/" className="flex items-center">
                  Contact
                </Link>
              </li>
              <li>
                <Button className='p-6'>
                  <Link href="/register" className="flex items-center">
                    Get started
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}