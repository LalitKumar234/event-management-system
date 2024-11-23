"use client"
import { Button } from "@/components/ui/button"
import { CgMenuBoxed } from "react-icons/cg";
import { IoBagOutline, IoPeopleOutline } from "react-icons/io5";
import { BiMoney } from "react-icons/bi";
import { useEffect } from "react";
import { Overview } from "@/components/dashboard/Overview";
import PieChartInfo from "@/components/dashboard/PieChart";
import { Card } from "@/components/ui/card";
import Orders from "@/components/dashboard/AreaChart";
import { MdOutlineArrowOutward } from "react-icons/md";


export default function Page() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4  gap-4">
                <div className="bg-white border h-28 rounded-md p-4">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold">120</h2>
                            <p className="text-sm font-medium">Total Menus</p>
                        </div>
                        <div className="text bg-blue-300 h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-lg">
                            <CgMenuBoxed size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white border h-28 rounded-md p-4">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold">530</h2>
                            <p className="text-sm font-medium">Total Orders</p>
                        </div>
                        <div className="text bg-green-300 h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-lg">
                            <IoBagOutline size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white border h-28 rounded-md p-4">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold">150</h2>
                            <p className="text-sm font-medium">Total Guests</p>
                        </div>
                        <div className="text bg-orange-300 h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-lg">
                            <IoPeopleOutline size={20} />
                        </div>
                    </div>
                </div>
                <div className="bg-white border h-28 rounded-md p-4">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold">9,00,000</h2>
                            <p className="text-sm font-medium">Revenue</p>
                        </div>
                        <div className="text bg-red-300 h-[2.5rem] w-[2.5rem] flex justify-center items-center rounded-lg">
                            <BiMoney size={20} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-10 flex gap-5 flex-col lg:flex-row">
                <div className="bg-white border rounded-md p-4 w-full">
                    <div className="mb-5 flex gap-2 items-center">
                        <h2 >Total Orders</h2>
                        <span className="bg-green-400 rounded-md text-xs text-white px-2 py-1 flex gap-1 items-center">14.3%<MdOutlineArrowOutward /></span>
                    </div>
                    <Overview />
                </div>
                <div className="bg-white border rounded-md p-4 w-full">
                    <PieChartInfo />
                </div>
            </div>
            <div className="bg-white border rounded-md p-4 w-full h-full mt-5">
                <Orders />
            </div>
        </>
    )
}