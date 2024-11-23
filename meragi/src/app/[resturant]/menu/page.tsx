
"use client"
import { Poppins, Roboto } from "next/font/google";
import { FaCircle } from "react-icons/fa";
import { IoTriangleSharp } from "react-icons/io5";
import Image from 'next/image'
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function Page({ params }: { params: { resturant: string } }) {
    const [dishes, setDishes] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}menu/get-categories/?resturantId=${params.resturant}`)
                // console.log(data)
                setCategories(data.result)
                setSelectedCategory(data.result[0]._id)
            } catch (err) {
                console.log(err)
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getMenu = async () => {
            if (categories.length > 0) {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}menu/get-menu/?categoryId=${selectedCategory}&resturantId=${params.resturant}`)
                    setDishes(data.result)
                    console.log(data.result)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        getMenu()
    }, [categories, selectedCategory])

    return (
        <main className={poppins.className} style={{ position: "relative", height: "100dvh" }}>
            <div className="px-3 pt-2">
                <h1 className="font-bold">Aahaar</h1>
                <ul className="flex text-[12px] mt-5 text-gray-500 gap-8 border-b pb-4 font-semibold">
                    {
                        categories.length && categories.map((item: any) =>
                            <li key={item._id} onClick={() => setSelectedCategory(item._id)} className={`${selectedCategory === item._id ? "text-black" : ""}`}>{item.title}</li>
                        )
                    }
                </ul>
                <div className="flex gap-3">
                    <button className="text-xs border border-gray-400 px-2 py-1 rounded-full mt-2 flex items-center gap-2">
                        <div className="border border-green-500 p-[2px] rounded">
                            <FaCircle size={8} className="text-green-500" />
                        </div> Veg
                    </button>
                    <button className="text-xs border border-gray-400 px-2 py-1 rounded-full mt-2 flex items-center gap-2">
                        <div className="border border-red-800 p-[2px] rounded">
                            <IoTriangleSharp size={8} className="text-red-800" />
                        </div> Non veg
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    {
                        dishes.length > 0 && dishes.map((dish: any, id) => (
                            <div>
                                {/* <h1>{dish?.subCategory}</h1> */}
                                {dish?.subCategory ? dish.dishes.map((subDish: any) => (
                                    <div key={subDish._id} className="mb-4 bg-green-50 w-full font-semibold rounded-2xl overflow-hidden border">
                                        <Image
                                            priority={false}
                                            src={subDish.foodImage}
                                            width={800}
                                            height={800}
                                            className="object-cover h-[8rem]"
                                            alt="Picture of the author"
                                        />
                                        <div className="p-2">
                                            <h2 className="text-xs">{subDish.foodName}</h2>
                                            <div className="flex items-center justify-between mt-2">
                                                <h3 className="text-xs">₹ {subDish.offerPrice}</h3>
                                                <button className="text-[11px] font-normal border bg-white border-red-700 text-red-700 px-2 rounded">ADD</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div key={id} className=" bg-green-50 w-full font-semibold rounded-2xl overflow-hidden border">
                                    <Image
                                        priority={false}
                                        src={dish.foodImage}
                                        width={800}
                                        height={800}
                                        className="object-cover h-[8rem]"
                                        alt="Picture of the author"
                                    />
                                    <div className="p-2">
                                        <h2 className="text-xs">{dish.foodName}</h2>
                                        <div className="flex items-center justify-between mt-2">
                                            <h3 className="text-xs">₹ {dish.offerPrice}</h3>
                                            <button className="text-[11px] font-normal border bg-white border-red-700 text-red-700 px-2 rounded">ADD</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>

                        ))
                    }
                </div>
            </div>
            {/* <div className="fixed bottom-0 w-full h-[4rem] bg-gray-900">
                <ul className="text-white flex justify-around items-center h-full">
                    <li className="text-[10px] text-light flex flex-col items-center">
                        <MdOutlineRestaurantMenu size={18} />
                        Menu
                    </li>
                    <li className="text-[10px] text-light flex flex-col items-center text-gray-400">
                        <TbShoppingCartCopy size={18} />
                        Order
                    </li>
                    <li className="text-[10px] text-light flex flex-col items-center text-gray-400">
                        <LuCalendarCheck2 size={18} />
                        Gallery
                    </li>
                    <li className="text-[10px] text-light flex flex-col items-center text-gray-400">
                        <MdOutlineLocalOffer size={18} />
                        Offers
                    </li>
                </ul>
            </div> */}
        </main>
    )
}