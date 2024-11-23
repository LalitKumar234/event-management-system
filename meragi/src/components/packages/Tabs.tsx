"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ScrollableTabs = () => {
    const [categories, setCategories] = useState<any>([{
        id: 1,
        name: "Mehendi"
    },
    {
        id: 2,
        name: "Sangeet"
    },
    {
        id: 3,
        name: "Haldi"
    },
    {
        id: 4,
        name: "Haldi"
    },
    {
        id: 5,
        name: "Wedding"
    }
    ]);
    const [details, setDetails] = useState(null);

    //   useEffect(() => {
    //     // Fetch categories from API
    //     fetch("/api/categories")
    //       .then((res) => res.json())
    //       .then((data) => setCategories(data))
    //       .catch((err) => console.error("Failed to fetch categories:", err));
    //   }, []);

    //   const handleTabChange = (category:any) => {
    //     // Fetch details for the selected category
    //     fetch(`/api/details?category=${category}`)
    //       .then((res) => res.json())
    //       .then((data) => setDetails(data))
    //       .catch((err) => console.error("Failed to fetch details:", err));
    //   };



    return (
        <div className="overflow-x-auto no-scrollbar">
            <Tabs defaultValue={categories[0]?.id || ""} className="w-full">
                <TabsList className=" bg-transparent border-b border-gray-200 whitespace-nowrap px-2">
                    {categories.map((category: any) => (
                        <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="px-4 py-2 whitespace-nowrap 
                     text-gray-500 bg-transparent transition-colors 
                     data-[state=active]:text-orange-500 data-[state=active]:border-b-2 
                     data-[state=active]:border-orange-500 
                     data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:rounded-none"
                        >
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={details?.category || ""} className="p-4">
                    {details ? (
                        <div>
                            <h2 className="text-lg font-bold">{details.title}</h2>
                            <p>{details.description}</p>
                        </div>
                    ) : (
                        <p>Loading details...</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>


    );
};

export default ScrollableTabs;


