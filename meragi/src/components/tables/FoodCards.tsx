
"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
    TableFooter
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useEffect, useState } from "react";


export default function FoodCards({ foodItems, incrementItem, decrementItem, createAnOrder, orderedFoodItems }: any) {
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = () => {
        let total = 0;
        orderedFoodItems.forEach((item: any) => {
            total += item.quantity * item.offerPrice;
        });
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
        console.log(totalPrice, "totalPrice")
    }, [orderedFoodItems]);

    return (
        <Table className="mt-8">
            <TableHeader>
                <TableRow className="border-none">
                    <TableHead className="w-[100px]">Items</TableHead>
                    <TableHead className="w-[50px] lg:w-[110px] text-center">Qty</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    foodItems.map((item: any) => (
                        <TableRow key={item.foodId} className="border-none hover:bg-none">
                            <TableCell className="font-medium">{item.foodName}</TableCell>
                            <TableCell className="text-center">
                                <div className="bg-primary flex items-center justify-between gap-1 rounded-md text-white font-bold">
                                    <button onClick={() => decrementItem(item.foodId)} className="w-8 h-8 flex items-center justify-center">
                                        <FiMinus size={20} />
                                    </button>
                                    {item.quantity}
                                    <button onClick={() => incrementItem(item.foodId)} className="w-8 h-8 flex items-center justify-center">
                                        <IoMdAdd size={20} />
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{item.price * item.quantity}</TableCell>
                        </TableRow>
                    ))
                }
                {
                    orderedFoodItems.map((item: any) => (
                        <TableRow key={item.foodId} className="border-none hover:bg-none">
                            <TableCell className="font-medium">{item.foodName}</TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1 font-bold">
                                    {item.quantity}
                                </div>
                            </TableCell>
                            <TableCell className="text-center ">{item.offerPrice * item.quantity}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Order Total</TableCell>
                    <TableCell className="text-center">
                        {
                            foodItems.length < 1 ?
                                <h2>
                                    {totalPrice}
                                </h2> :
                                <Button variant="outline" onClick={createAnOrder}>Print KOT</Button>
                        }
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}