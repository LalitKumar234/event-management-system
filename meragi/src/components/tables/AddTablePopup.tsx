import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoAddOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DishType } from "@/app/dashboard/dish/page";
import useFileUpload from "@/hooks/useFileUpload";
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

export interface TableType {
    seater: String,
    color: String,
}

interface PopupProp {
    setTableDetails: (dishDetails: TableType) => void,
    tableDetails: TableType,
    handleAddTable: () => void,
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const seaters = [2, 3, 4, 6, 8, 10, 12, 14]


export function AddTablePopup({
    handleAddTable,
    setTableDetails,
    tableDetails,
    setOpen,
    open
}: any) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full font-normal w-[10rem]">
                    <IoAddOutline size={20} />Add a table</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">Add table</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
                        Table name
                    </Label>
                    <Input placeholder="@name" onChange={(e) => setTableDetails({ ...tableDetails, tableName: e.target.value })} />
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
                            Seater
                        </Label>
                        <Select defaultValue={tableDetails.seater.toString()} onValueChange={(value) => setTableDetails({ ...tableDetails, seater: value })}>
                            <SelectTrigger className=" w-96">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    seaters.map((item: any) =>
                                        <SelectItem value={item} key={item}>{item}</SelectItem>)
                                }
                            </SelectContent>
                        </Select>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAddTable}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
