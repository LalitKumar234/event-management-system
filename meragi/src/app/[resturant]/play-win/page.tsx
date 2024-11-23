"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette'

export default function PlayWin() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phoneNumber: ""
    })

    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true)
        }, 2000)
    }, [])
    const data = [
        {
            id: 0,
            option: "50% off"
        },
        {
            id: 1,
            option: "30% off"
        },
        {
            id: 2,
            option: "10% off"
        },
        {
            id: 3,
            option: "Buy 2 get one free"
        },
        {
            id: 4,
            option: "Better luck next time"
        },
        {
            id: 5,
            option: "60% off"
        },
    ]

    const handleSpinClick = () => {
        if (userDetails.name !== "" || userDetails.phoneNumber !== "") {
            if (!mustSpin) {
                const newPrizeNumber = Math.floor(Math.random() * data.length);
                setPrizeNumber(newPrizeNumber);
                setMustSpin(true);
            }
        }
        return 
    }

    const handleClaim = () => {
        setIsOpen(false)
    }


    return (
        <div className=" bg-primary text-white h-screen relative">
            <div className="p-5">
                <span className="text-sm font-semibold">You've found us</span>
                <h1 className="text-3xl font-semibold">
                    Get exciting offers by spinning the wheel
                </h1>
            </div>
            {/* <div className=" flex flex-col items-center justify-center mt-18"> */}
            <div className="bg-white relative text-black px-5 h-[510px] rounded-t-3xl flex flex-col items-center justify-center">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={0.2}
                    prizeNumber={prizeNumber}
                    // data={rouletteData}
                    data={data}
                    outerBorderColor={"#ccc"}
                    outerBorderWidth={9}
                    innerBorderColor={"#f2f2f2"}
                    radiusLineColor={"tranparent"}
                    radiusLineWidth={1}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    fontSize={17}
                    backgroundColors={[
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f",
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f",
                    ]}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                {/* <Button onClick={handleSpinClick} className="" variant="default">Spin</Button> */}
                <button onClick={handleSpinClick} className="bg-white h-[3rem] w-[3rem] rounded-full border absolute z-30">Spin</button>
            </div>
            {
                isOpen && <div className="bg-[rgba(0,0,0,0.5)] absolute top-0 z-40 w-full text-black pt-5 px-5 h-screen flex justify-center flex-col">
                    <div className="bg-white p-4 rounded-md">
                        <div>
                            <Label>Enter your details & start playing</Label>
                            <Input placeholder="Your name" className="mt-2" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
                        </div>
                        <div className="mt-5 flex border items-center rounded-md px-3">
                            <span>+91-</span>
                            <Input placeholder="Your Phone Number" className="border-none shadow-none" value={userDetails.phoneNumber} onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })} />
                        </div>
                        <Button className="mt-5 w-full bg-blue-600" onClick={handleClaim}>Claim your reward</Button>
                    </div>
                </div>
            }
        </div>
    )
}