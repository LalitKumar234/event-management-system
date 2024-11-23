"use client"
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { LuSquareStack } from "react-icons/lu";
import { MdOutlineTableRestaurant } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Pacifico } from "next/font/google";
import { GrCatalog } from "react-icons/gr";
import CatalogSideNav from "@/app/dashboard/catalog/SideNav";

const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});


const SideNav = ({ handleOpen, isOpen }: any) => {
  const routeName = usePathname();
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "User", link: "/dashboard/user-management", icon: BiUser },
    { name: "Catalog", link: "/dashboard/catalog", icon: GrCatalog },
    // { name: "Category", link: "/dashboard/category", icon: LuSquareStack },
    // { name: "Tables", link: "/dashboard/tables", icon: MdOutlineTableRestaurant },
    { name: "Order", link: "/dashboard/order", icon: FiShoppingCart },
  ];

  return (
    <section className=" border-r flex fixed top-0 left-0 z-50 bg-white">
      <div
        className={`min-h-screen border-r ${isOpen ? "w-[17rem]" : "w-[5rem]"
          } px-4`}
      >
        <div className="py-3 flex justify-between">
          {/* Show the logo only on mobile devices */}
          {/* <div className="block lg:hidden">dineo.in</div> */}
          <div className={pacifico.className}>
            <div className='text-xl block lg:hidden'>dineo<span className='text-primary'>.in</span></div>
          </div>
          {
            isOpen && <div className={pacifico.className}>
              <div className='text-3xl'>dineo<span className='text-primary'>.in</span></div>
            </div>
          }
          {/* Hamburger menu */}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer invisible lg:visible"
            onClick={() => handleOpen()}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
            >
              <Button variant={routeName === menu.link ? "default" : "ghost"} className="w-full flex items-center justify-start gap-3">
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2 className={`${!isOpen && "opacity-0 overflow-hidden"}`}>
                  {menu?.name}
                </h2>
              </Button>
              <h2
                className={`${isOpen && "hidden"
                  } absolute left-48 text-sm font-normal bg-primary text-primary-foreground whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      {routeName === "/dashboard/catalog" ?
        <CatalogSideNav /> : null}
    </section>
  );
};

export default SideNav;
