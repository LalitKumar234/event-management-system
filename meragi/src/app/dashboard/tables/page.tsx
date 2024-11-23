"use client"

import { AddTablePopup } from "@/components/tables/AddTablePopup";
import OrderPopup from "@/components/tables/OrderPopup";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Tables() {
    const axiosPrivate = useAxiosPrivate();
    const [tables, setTables] = useState([]);
    const [tableOrders, setTableOrders] = useState({});
    const [tableId, setTableId] = useState("");
    const router = useRouter()
    const [open, setOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [orderOpen, setOrderOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [tableDetails, setTableDetails] = useState({
        tableName: "",
        seater: "",
        color: "#188bcd",
    })

    const handleAddTable = async () => {
        try {
            const { data } = await axiosPrivate.post(`table`, tableDetails)
            console.log(data)
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    const getTables = async () => {
        try {
            const { data } = await axiosPrivate.get(`table`)
            setTables(data.result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTables();
        const pollingInterval = 60000;
        const intervalId = setInterval(getTables, pollingInterval);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            <div className="flex justify-between">
                <h2>Tables</h2>
                {/* <Button>
                    <IoAddOutline size={20} />
                    Create a new table
                </Button> */}
                <AddTablePopup
                    tableDetails={tableDetails}
                    setTableDetails={setTableDetails}
                    open={open}
                    setOpen={setOpen}
                    handleAddTable={handleAddTable}
                />
            </div>
            <div className="flex gap-5 flex-wrap">
                {
                    tables.length > 0 && tables.map((table: any) => (
                        <div className="border border-white hover:border-blue-500 p-4 rounded-lg cursor-pointer" key={table._id} onClick={()=>router.push(`tables/${table._id}`, { scroll: false })}>
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
                        // <OrderPopup
                        //     handleClick={() => setTableId(table._id)}
                        //     tableId={tableId}
                        //     key={table._id}
                        //     table={table}
                        //     tableOrders={tableOrders}
                        //     open={orderOpen}
                        //     setOpen={setOrderOpen}
                        // />
                    ))
                }
            </div>
        </>
    )
}