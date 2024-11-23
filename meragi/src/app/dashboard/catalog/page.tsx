"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { Edit3 } from "lucide-react"; // For the edit icon

export type Design = {
  id: string
  name: string
  image: string
  price: number
}

const Catalog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Design[]>([]);

  const priceFormat = (price: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(price)
    return formatted
  }



  async function getDesigns() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("designs").select();
      if (error) {
        console.error("Error fetching designs:", error.message);
        setData([]);
        return;
      }
      setData(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDesigns();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="p-4 ml-[20rem]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((design) => (
          <div
            key={design.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden group"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={design.image} // Replace with your image field
                alt={design.name}
                className="w-full h-48 object-cover"
              />
              {/* Edit Icon */}
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            {/* Details */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900">{design.name}</h3>
              <p className="text-xs text-gray-600">{priceFormat(design.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="text-center text-gray-500 py-8">No designs found.</div>
      )}
    </div>
  );
};

export default Catalog;
