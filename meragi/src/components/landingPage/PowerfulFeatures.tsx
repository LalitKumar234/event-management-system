"use client"
import Image from "next/image";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
export default function PowerfulFeatures() {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
            <h2 className="text-3xl lg:text-4xl font-medium text-center">Simple, yet <br />
                <span className="text-primary">powerful features</span>
            </h2>
            <div className="flex flex-col lg:flex-row w-full gap-5 mt-10">
                <div className="bg-[#f8fbff] border rounded-xl border-[#eaedf2] lg:w-1/2 p-5" >
                    <div className="w-[5rem] h-[5rem] border bg-primary rounded-full text-white flex items-center justify-center">
                        <TbDeviceAnalytics size={40} />
                    </div>
                    <h2 className="text-2xl font-medium mt-5">Advanced Analytics</h2>
                    <p className="mt-3 text-sm lg:text-lg">Observe and analyse your restaurant performance in real-time. From orders, revenue, to the number of guests</p>
                    <div className='mt-10'>
                        <Image
                            src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_cab17423-d9d2-4092-baf1-0af5f1e1cd69resturant_dishanalytics.png"
                            width={550}
                            height={900}
                            alt="add dish"
                        />
                    </div>
                </div>
                <div className="bg-[#f8fbff] border rounded-xl border-[#eaedf2] lg:w-1/2 p-5" >
                    <div className="w-[5rem] h-[5rem] border bg-primary rounded-full text-white flex items-center justify-center">
                        <FiShoppingCart size={40} />
                    </div>
                    <h2 className="text-2xl font-medium mt-5">Order Management</h2>
                    <p className="mt-3 text-sm lg:text-lg">Say good bye to pen and paper and take table wise order in just one click.</p>
                    <div className='mt-10'>
                        <Image
                            src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_43b20b4c-557d-4645-87ec-c5449310997cresturant_dishGroup 1119.png"
                            width={550}
                            height={900}
                            alt="add dish"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}