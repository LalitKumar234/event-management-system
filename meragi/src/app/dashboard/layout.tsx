"use client"
import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import React, { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setisOpen] = useState(false)

  return (
    <main className='w-full bg-[#f7f9fc] overflow-y-auto relative'>
      <SideNav handleOpen={() => setisOpen(!isOpen)} isOpen={isOpen} />
      <div className={`${!isOpen ? "collapse-mainDashboard" : "mainDashboard"}  relative`}>
        <TopNav className={`${!isOpen ? "collapse-nav" : "nav"} fixed p-3 flex justify-between items-center bg-white shadow-sm`} />
        <main className="py-20 px-3 lg:px-7 h-[100dvh]">
          {children}
        </main>
      </div>
    </main>
  )
}
