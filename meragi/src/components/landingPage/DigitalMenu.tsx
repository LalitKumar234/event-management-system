import Image from "next/image";

export default function DigitalMenu() {
    return (
        <div className="bg-[#f8fbff] py-20 my-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
                <h2 className="text-3xl lg:text-4xl font-medium text-center">Digital menu {""}
                    <span className="text-primary">and QR codes</span>
                </h2>
                <p className="mt-3 text-center text-sm lg:text-lg">Dineo allows you to create a beautiful digital menus along with the QR code.<br />
                    So that your guest do not need to wait for your waiters</p>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10">
                    <div className="lg:w-1/2">
                        <ul className="flex flex-col gap-5">
                            <li className="bg-white p-10 shadow-md rounded-3xl font-medium lg:text-xl flex items-center justify-start gap-3 "> <span className="bg-primary text-white min-w-[3rem] h-[3rem] flex items-center justify-center rounded-full">1.</span>Create your QR codes for each table</li>
                            <li className="bg-white p-10 shadow-md rounded-3xl font-medium lg:text-xl flex items-center justify-start gap-3"> <span className="bg-primary text-white min-w-[3rem] h-[3rem] flex items-center justify-center rounded-full">2.</span>Digital menu with lots of features</li>
                            <li className="bg-white p-10 shadow-md rounded-3xl font-medium lg:text-xl flex items-center justify-start gap-3"> <span className="bg-primary text-white min-w-[3rem] h-[3rem] flex items-center justify-center rounded-full">3.</span>Take orders directly from your digital menu</li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 border flex justify-end rounded-3xl bg-primary mt-10 pt-10">
                        <div className="">
                            <Image
                                src="https://resturant-images-dev.s3.ap-south-1.amazonaws.com/creatives_v0/dish_b6eaee20-4a4e-4951-8569-a326b8a5b9d9resturant_dishGroup%201121%20(1).png"
                                width={400}
                                height={900}
                                alt="add dish"

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}