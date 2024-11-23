"use client"
import { Button } from "@/components/ui/button"
import {
    Input,
} from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { PiDotsThreeBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";


export default function Category() {
    const axiosPrivate = useAxiosPrivate()
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("")
    const [data, setData] = useState([]);
    const [render, setRender] = useState(false);
    const [isOpen, setIsOpen] = useState("");

    const handleAddCategory = async () => {
        try {
            const { data } = await axiosPrivate.post(`food/category`, {
                title: category,
                category: category.toLowerCase()
            });
            console.log(data?.result);
            setCategory("")
            setRender(!render)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubCategory = async (categoryId: String) => {
        try {
            const { data } = await axiosPrivate.post(`food/sub-category`, {
                title: subCategory,
                subCategory: subCategory.toLowerCase(),
                category: categoryId
            });
            console.log(data?.result);
            setCategory("")
            setSubCategory("")
            setRender(!render)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteCategory = async (id: String) => {
        try {
            const { data } = await axiosPrivate.delete(`food/category/${id}`);
            console.log(data?.result);
            setRender(!render)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const getCategoriesAndSubCategories = async () => {
            try {
                const { data } = await axiosPrivate.get(`food/category-sub-category`);
                console.log(data?.result);
                setData(data?.result)
            } catch (err) {
                console.log(err)
            }
        }
        getCategoriesAndSubCategories()
    }, [render])
    return (
        <>
            <h1 className="text-2xl font-semibold">Categories and subcategories</h1>
            <div className="w-full lg:w-1/2">
                <div className="mt-5 flex gap-5">
                    <Input placeholder="New category" value={category} className="bg-white" onChange={(e) => setCategory(e.target.value)} />
                    <Button onClick={handleAddCategory}>Add</Button>
                </div>
                <h2 className=" text-muted-foreground text-xs mt-2">Create your categories adding a new category</h2>
                {
                    data.length > 0 ? data.map((item: any) =>
                        <Card key={item.category._id} className="flex flex-col mt-5">
                            <div className="text-sm font-medium font px-3 py-1 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IoIosArrowForward className="cursor-pointer" onClick={() => {setIsOpen(item.category._id)}}/>{item.category.title}
                                </div>
                                <Popover>
                                    <PopoverTrigger>
                                        <PiDotsThreeBold size={24} className="" />
                                    </PopoverTrigger>
                                    <PopoverContent className="max-w-[180px]">
                                        <div className="flex flex-col items-start">
                                            <Button variant="ghost" >Add Subcategory</Button>
                                            <Button variant="ghost" onClick={() => handleDeleteCategory(item.category._id)}>Delete</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            {
                                isOpen === item.category._id && (
                                    <div className="pl-10 pr-4 text-sm py-2">
                                        <div className="flex gap-5">
                                            <Input placeholder="New subcategory" value={subCategory} className="bg-white" onChange={(e) => setSubCategory(e.target.value)} />
                                            <Button onClick={() => handleSubCategory(item.category._id)}>Add</Button>
                                        </div>
                                        <ul>
                                            {item.subcategories.map((subItem: any) => (
                                                <li key={subItem._id} className="p-1 border rounded-md mt-3">{subItem.title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }
                        </Card>
                    ) : <h2>No categories found</h2>
                }
            </div>
        </>
    )
}