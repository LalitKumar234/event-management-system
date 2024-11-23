"use client";
import { useEffect, useState } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { supabase } from "@/utils/supabase/client";
import Loader from "@/components/Loader";
import { IoIosSearch } from "react-icons/io";

export default function DemoPage() {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getCustomers() {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.from("leads").select();
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
        getCustomers();
    }, []);

    return (
        <div className="mx-auto py-4">
            <div className="my-4 border w-auto max-w-[18rem] flex items-center px-3 rounded-md">
                <IoIosSearch size={22} className="text-slate-400" />
                <input
                    type="text"
                    className="w-full p-2 bg-transparent text-sm focus:outline-none"
                    placeholder="Search for user"
                />
            </div>
            {isLoading ? <Loader /> : <DataTable columns={columns} data={data} />}
        </div>
    );
}
