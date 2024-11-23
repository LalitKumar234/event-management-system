"use client"
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from '@/utils/supabase/client';
import Loader from '@/components/Loader';

const CatalogSideNav = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);

    async function getCategories() {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.from("categories").select();
            console.log(data, "data")
            if (error) {
                console.error("Error fetching customers:", error.message);
                setData([]);
                return;
            }
            setData(data || []);
        } catch (err) {
            console.error("Unexpected error:", err);
            setData([]);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCategories();
        console.log(data)
    }, []);
    return (
        <div className="w-[20rem] h-screen p-4">
            <h2 className="font-semibold text-[18px]">Filters</h2>
            <Accordion type="single" collapsible className='mt-6' defaultValue='item-1'>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent className="border-t pt-3">
                        {
                            isLoading ? <Loader /> :
                                <div className="flex flex-col gap-4">
                                    {
                                        data.map((category: any) => (
                                            <div className="items-top flex items-center gap-2" key={category.id}>
                                                <Checkbox id={category.id} />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor="terms1"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {category.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default CatalogSideNav