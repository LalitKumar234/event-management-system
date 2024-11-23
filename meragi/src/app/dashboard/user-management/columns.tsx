"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { IoIosAdd } from "react-icons/io";
import { FaNotesMedical } from "react-icons/fa6";

export type User = {
    id: string
    name: string
    status: "pending" | "processing" | "success" | "failed"
    email: string
    phone: string
    eventDate: string
    budget: number
    service: "decor" | "photography"
    city: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original
            return (
                <div>
                    <div className="">{user.name}</div>
                    <div className="flex gap-2">
                    <Button className="mt-2" variant="outline" size="sm">
                        <IoIosAdd size={20}/>
                        Package
                    </Button>
                    <Button className=" mt-2" variant="outline" size="sm">
                        <FaNotesMedical size={18}/>
                    </Button>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "eventDate",
        header: "Event Date"
    },
    {
        accessorKey: "budget",
        header: () => <div className="text-center">Budget</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("budget"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
            }).format(amount)
            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy project ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>Create Catalog</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
