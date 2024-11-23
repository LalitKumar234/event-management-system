"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import Image from 'next/image'
import { IoIosCloseCircleOutline } from "react-icons/io";
import FoodCards from "./FoodCards";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

interface FoodItem {
    foodId: String;
    quantity: any;
    foodName: String,
    price: String,
}

export default function OrderPopup({ table, open, setOpen, tableId, handleClick }: any) {
    const [searchKey, setSearchKey] = useState("")
    const [searchedItem, setSearchedItem] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [orderedFoodItems, setOrderedFoodItems] = useState([]);
    const { toast } = useToast();

    const addFoodItem = (id: string, foodName: String, price: String) => {
        const existingItemIndex = foodItems.findIndex(item => item.foodId === id);

        if (existingItemIndex !== -1) {
            const updatedItems = foodItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        foodName,
                        price
                    };
                }
                return item;
            });
            setFoodItems(updatedItems);
        } else {
            const newItem: FoodItem = {
                foodId: id,
                quantity: 1,
                foodName: foodName,
                price: price
            };
            setFoodItems(prevItems => [...prevItems, newItem]);
        }
    };

    const incrementItem = (id: string) => {
        setFoodItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.foodId === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const decrementItem = (id: string) => {
        setFoodItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.foodId === id && item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const createAnOrder = async (table: String) => {
        try {
            const { data } = await axiosPrivate.post(`table-order/${tableId}`, foodItems)
            console.log(data.result, "table")
            setFoodItems([])
        } catch (err) {
            console.log(err)
        }
    }




    const getTableOrders = async (table: String) => {
        try {
            const { data } = await axiosPrivate.get(`table-order/${table}`)
            console.log(data.result, "table data")
            setOrderedFoodItems(data.result.foodItems)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTableOrders(table._id)
    }, [foodItems])


    const handleCheckoutOrder = async (table: String) => {
        console.log(table)
        try {
            const { data } = await axiosPrivate.get(`table-order/checkout/${table}`)
            console.log(data)
            toast({
                title: "Successful!!",
                description: `Successfull order checked out for this table`,
            })
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div onClick={handleClick} className="border border-white hover:border-blue-500 p-4 rounded-lg cursor-pointer" key={table._id}>
                    <div className="flex justify-around rounded-md gap-2">
                        {
                            Array.from(Array(table.seater / 2).keys()).map((_, id) => (
                                <div key={id} className="bg-blue-500 w-[4rem] h-[1rem] rounded-md"></div>
                            ))
                        }
                    </div>
                    <div className="my-2 border border-blue-500 h-[4rem] rounded-lg flex items-center justify-center px-2">
                        {table.timeDuration ?
                            <p className="bg-blue-100 p-2 rounded-md font-medium text-sm">{table?.timeDuration}</p>
                            : <p className="bg-blue-100 p-2 rounded-md font-medium text-sm">{table?.tableName}</p>}
                    </div>
                    <div className="flex justify-around rounded-md">
                        {
                            Array.from(Array(table.seater / 2).keys()).map((_, id) => (
                                <div key={id} className="bg-blue-500 w-[4rem] h-[1rem] rounded-md"></div>
                            ))
                        }
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] h-[90vh] lg:h-aut0 flex flex-col border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">Order for table {table.tableName}</DialogTitle>
                </DialogHeader>
                <div className="relative flex justify-between items-center border rounded-md max-w-[400px] w-full px-2">
                    <div className="flex items-center justify-center w-full bg-white">
                        <IoSearchOutline />
                        <Input className="border-transparent shadow-none focus-visible:ring-0 rounded-full" placeholder="Search for items..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                        {searchKey !== "" && <IoIosCloseCircleOutline onClick={() => setSearchKey("")} size={20} className="text-red-500 cursor-pointer" />}
                    </div>
                    {
                        searchedItem?.length > 0 ?
                            <ul className="flex flex-col gap-2 py-1 right-0 rounded-md absolute border w-full top-[40px] bg-white z-50">
                                {searchedItem?.map((dish: any) => (
                                    <li
                                        key={dish._id}
                                        onClick={() => {
                                            addFoodItem(dish._id, dish.foodName, dish.offerPrice)
                                            setSearchKey("")
                                        }}
                                        className="text-sm mt-2 px-2">
                                        {dish.foodName}
                                    </li>
                                ))}
                            </ul> : <></>
                    }
                </div>
                <FoodCards
                    orderedFoodItems={orderedFoodItems}
                    foodItems={foodItems}
                    incrementItem={incrementItem}
                    decrementItem={decrementItem}
                    createAnOrder={() => createAnOrder(table._id)}
                />
                <DialogFooter className="absolute bottom-10">
                    <Button type="submit" onClick={() => handleCheckoutOrder(table._id)}>Checkout order</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}