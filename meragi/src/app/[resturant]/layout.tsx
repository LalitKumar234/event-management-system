'use client'

import { useEffect } from 'react'
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Poppins } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoGameControllerOutline } from "react-icons/io5";
import { RiGalleryFill } from "react-icons/ri";


const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const routeName = usePathname();

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        })
    })

    // console.log(routeName, "routeName")

    const getRouteName = (route:String) => {
        const routeName = route.split("/")
        console.log(routeName[2])
        return routeName[2]
    }
    // useEffect(()=>{
    //     getRouteName(routeName)
    // }, [])

    return (
        <>
            <main className={poppins.className}>
                {children}
            </main>
            <div className="fixed bottom-0 w-full h-[4rem] bg-gray-900 z-50">
                <ul className=" flex justify-around items-center h-full">
                    <li className="text-[10px] text-light">
                        <Link href="menu" className={`flex flex-col items-center text-gray-400 ${getRouteName(routeName) === 'menu' && 'text-white'}`}>
                            <MdOutlineRestaurantMenu size={18} />
                            Menu
                        </Link>
                    </li>
                    <li className="text-[10px] text-light text-gray-400">
                        <Link href="play-win" className={`flex flex-col items-center text-gray-400 ${getRouteName(routeName) === 'play-win' && 'text-white'}`}>
                            <IoGameControllerOutline size={18} />
                            Play & win
                        </Link>
                    </li>
                    <li className="text-[10px] text-light flex flex-col items-center text-gray-400">
                        <Link href="gallery" className={`flex flex-col items-center text-gray-400 ${getRouteName(routeName) === 'gallery' && 'text-white'}`}>
                            <RiGalleryFill size={18} />
                            Gallery
                        </Link>
                    </li>
                    <li className="text-[10px] text-light flex flex-col items-center text-gray-400">
                        <Link href="events" className={`flex flex-col items-center text-gray-400 ${getRouteName(routeName) === 'events' && 'text-white'}`}>
                            <LuCalendarCheck2 size={18} />
                            Events
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}