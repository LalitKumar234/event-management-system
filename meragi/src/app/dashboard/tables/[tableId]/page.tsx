"use client"
import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast"
import FoodCards from "@/components/tables/FoodCards";

interface FoodItem {
    foodId: String;
    quantity: any;
    foodName: String,
    price: String,
}


export default function Page({ params }: { params: { tableId: string } }) {
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
            const { data } = await axiosPrivate.post(`table-order/${params.tableId}`, foodItems)
            console.log(data.result, "table")
            setFoodItems([])
        } catch (err) {
            console.log(err)
        }
    }

    const getSearchedItems = async () => {
        try {
            const { data } = await axiosPrivate.get(`food/search/?searchKey=${searchKey}`)
            setSearchedItem(data.result)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getSearchedItems()
    }, [searchKey])

    const handleCheckoutOrder = async (table: String) => {
        console.log(table)
        try {
            const { data } = await axiosPrivate.get(`table-order/checkout/${params.tableId}`)
            console.log(data)
            toast({
                title: "Successful!!",
                description: `Successfull order checked out for this table`,
            })
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
        getTableOrders(params.tableId)
    }, [foodItems])

    return (
        <>
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/tables">Tables</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Order</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
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
                createAnOrder={() => createAnOrder(params.tableId)}
            />
            <Button className="mt-5" type="submit" onClick={() => handleCheckoutOrder(params.tableId)}>Checkout order</Button>
        </>
    )
}