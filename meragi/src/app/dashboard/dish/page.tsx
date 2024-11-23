"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { IoSearchOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Image from 'next/image'
import { AddDishPopup } from "@/components/AddDishPopup";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { MdOutlineDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link";

export interface DishType {
    foodName: String,
    foodDesc: String,
    foodImage: String,
    originalPrice: String,
    offerPrice: String,
    category: String,
    type: String,
    subCategory: String
}

interface FoodItem {
    _id: string;
    foodId: string;
    foodName: string;
    foodDesc: string;
    foodImage: string;
    originalPrice: number;
    offerPrice: number;
    category: string;
    subCategory: string;
    resturant: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Dishes {
    [subcategory: string]: FoodItem[];
}

export default function Dish() {
    const { toast } = useToast();
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState<Array<{ _id: String, title: String }>>([])
    const [subCategories, setSubCategories] = useState<Array<{ _id: String, title: String, category: String }>>([])
    const [selectedCategory, setSelectedCategory] = useState<String>("");
    const [dishes, setDishes] = useState([]);
    const [render, setRender] = useState<Boolean>(false)
    const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [dishDetails, setDishDetails] = useState<DishType>({
        foodName: "",
        foodDesc: "",
        foodImage: "",
        originalPrice: "",
        offerPrice: "",
        category: "",
        subCategory: "",
        type: "veg"
    })

    const handleAddDish = async () => {
        try {
            const { data } = await axiosPrivate.post(`food/add-food`, dishDetails)
            console.log(data)
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axiosPrivate.get('food/category')
                // console.log(data)
                setCategories(data.categories)
                setSelectedCategory(data.categories[0]._id)
            } catch (err) {
                console.log(err)
            }
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getSubCategories = async () => {
            if (dishDetails.category !== "") {
                try {
                    const { data } = await axiosPrivate.get(`food/sub-category/?category=${dishDetails.category}`);
                    // console.log(data);
                    if (data.subcategories) {
                        setSubCategories(data.subcategories);
                    } else {
                        setSubCategories([]);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getSubCategories();
    }, [dishDetails]);

    useEffect(() => {
        const getDishes = async () => {
            if (selectedCategory !== "") {
                try {
                    const { data } = await axiosPrivate.get(`food/get-dish/?categoryId=${selectedCategory}`);
                    console.log(data?.result);
                    setDishes(data?.result)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        getDishes()
    }, [selectedCategory, open, render])

    const handleDeleteDish = async (id: String) => {
        try {
            const { data } = await axiosPrivate.delete(`food/delete-dish/${id}`)
            console.log(data)
            setRender(!render)
            toast({
                title: "Successful",
                description: "Dish deleted successfully",
            })
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-1/2">
                    <h1 className="lg:text-2xl font-semibold">Food management</h1>
                    <div className="border rounded-full flex items-center justify-center pl-3 max-w-[300px] w-full ml-10 bg-white">
                        <IoSearchOutline />
                        <Input className="border-none" />
                    </div>
                </div>
                <AddDishPopup
                    open={open}
                    setOpen={setOpen}
                    categories={categories}
                    setDishDetails={setDishDetails}
                    dishDetails={dishDetails}
                    handleAddDish={handleAddDish}
                    subCategories={subCategories}
                />
            </div>
            <div className="bg-white w-full p-5 mt-5 rounded-md overflow-x-auto flex items-center gap-2">
                {
                    categories.length > 0 ? categories.map((item: any) =>
                        <Button key={item._id} onClick={() => {
                            setSelectedCategory(item._id)
                            setDishDetails({...dishDetails, category: item._id})
                            }} className={`rounded-full font-light text-xs gap-2 shadow-md ${selectedCategory === item._id ? "border-primary" : "border-none"}`} variant="outline">
                            {item.title}
                        </Button>
                    ) : <h3 className="text-sm">
                        You don't have any categories and sub categories?
                        <Link href="/dashboard/category">
                            <Button className="ml-2 border-primary hover:bg-red-100 text-primary hover:text-primary" variant="outline">
                                Create now
                            </Button>
                        </Link>
                    </h3>
                }
            </div>
            {
                dishes.length > 0 && dishes.map((item: any) => (
                    <div className="mt-5" key={item._id}>
                        <div className="flex items-center gap-2">
                            <h2>{item.subCategory}</h2>
                            <div className="flex">
                                <MdKeyboardArrowLeft size={25} />
                                <MdKeyboardArrowRight size={25} />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-5">
                            {item.subCategory !== "" && <div onClick={() => {
                                setDishDetails({ ...dishDetails, category: selectedCategory, subCategory: item._id })
                                setOpen(true)
                            }} className="border border-dashed border-primary w-[9rem] h-[10rem] p-4 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-red-100 bg-red-50">
                                <div className="border border-primary text-primary rounded-full w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer">
                                    <IoAddOutline size={20} />
                                </div>
                                <p className="text-xs text-center">Add new dish to {item.subCategory}</p>
                            </div>}
                            {item.dishes.map((dish: FoodItem) => (
                                <div key={dish._id} className=" w-[9rem] h-[10rem] rounded-2xl shadow-md overflow-hidden">
                                    <div className="h-[7rem] w-full flex items-center justify-center bg-slate-100 relative">
                                        <div className="bg-red-500 absolute top-2 right-2 p-1 rounded-md shadow-md cursor-pointer" onClick={() => handleDeleteDish(dish._id)}>
                                            <MdOutlineDelete className="text-white" />
                                        </div>
                                        <Image
                                            src={dish.foodImage}
                                            width={800}
                                            height={800}
                                            className="object-cover h-[7rem]"
                                            alt="Picture of the author"
                                        />
                                    </div>
                                    <p className="text-xs text-center h-[3rem] flex items-center justify-center">{dish.foodName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            {/* <div className="mt-5">
                <div className="flex items-center gap-2">
                    <h2>Mixed vegetables</h2>
                    <div className="flex">
                        <MdKeyboardArrowLeft size={25} />
                        <MdKeyboardArrowRight size={25} />
                    </div>
                </div>
                <div className="mt-4 flex gap-5">
                    <div className="border border-dashed border-primary w-[9rem] h-[10rem] p-4 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-red-100 bg-red-50">
                        <div className="border border-primary text-primary rounded-full w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer">
                            <IoAddOutline size={20} />
                        </div>
                        <p className="text-xs text-center">Add new dish to potato</p>
                    </div>
                    <div className=" w-[9rem] h-[10rem] rounded-2xl shadow-md overflow-hidden">
                        <div className="h-[7rem] w-full flex items-center justify-center bg-slate-100">
                            <LuVegan size={35} className="text-gray-300" />
                        </div>
                        <p className="text-xs text-center h-[3rem] flex items-center justify-center">Potato curry</p>
                    </div>
                    <div className=" w-[9rem] h-[10rem] rounded-2xl shadow-md overflow-hidden">
                        <div className="h-[7rem] w-full flex items-center justify-center bg-slate-100">
                            <LuVegan size={35} className="text-gray-300" />
                        </div>
                        <p className="text-xs text-center h-[3rem] flex items-center justify-center">Potato curry</p>
                    </div>
                    <div className=" w-[9rem] h-[10rem] rounded-2xl shadow-md overflow-hidden">
                        <div className="h-[7rem] w-full flex items-center justify-center bg-slate-100">
                            <Image
                                src="https://img.taste.com.au/z8t9Lqz3/taste/2016/11/best-ever-potato-chips-105022-1.jpeg"
                                width={800}
                                height={800}
                                className="object-cover h-[7rem]"
                                alt="Picture of the author"
                            />
                        </div>
                        <p className="text-xs text-center h-[3rem] flex items-center justify-center">Potato curry</p>
                    </div>
                </div>
            </div> */}
        </>
    )
}
