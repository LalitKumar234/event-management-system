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
import sharp from 'sharp';
interface PopupProp {
  setDishDetails: (dishDetails: DishType) => void,
  dishDetails: DishType,
  handleAddDish: () => void,
  categories: Array<{ _id: String, title: String }>,
  subCategories: Array<{ _id: String, title: String, category: String }>,
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export function AddDishPopup({
  setDishDetails,
  dishDetails,
  handleAddDish,
  categories,
  subCategories,
  setOpen,
  open
}: PopupProp) {
  const { uploadFile, uploadProgress } = useFileUpload();

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) {
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const extensions = ["png", "jpg", "jpeg"];

    if (extensions.includes(fileExtension)) {
      const dishId = `dish_${uuidv4()}`;
      const newName = `resturant_dish${file.name}`;
      const folder = "creatives_v0";
      try {
        const uploadedImageLink = await uploadFile(file, dishId, newName, folder);
        console.log(uploadedImageLink)
        setDishDetails({ ...dishDetails, foodImage: uploadedImageLink || "" })
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full font-normal w-[10rem]">
          <IoAddOutline size={20} />Add Dish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Add Dish</DialogTitle>
        </DialogHeader>
        {/* <div className="bg-gray-200 p-4 rounded-xl">
          <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
            Image
          </Label>
          <div className="bg-white border border-dashed rounded-lg py-8 mt-2 flex flex-col items-center justify-center gap-2">
            <IoCloudUploadOutline />
            <p className="text-xs">Upload dish image</p>
          </div>
        </div> */}
        <label htmlFor="upload-creative">
          <input type="file" accept="image/jpeg, image/png" id="upload-creative" className="hidden" onChange={(e) => handleFileUpload(e)} />
          {
            dishDetails.foodImage !== "" ?
              <div className="border border-dashed rounded-sm flex flex-col items-center justify-center p-3 relative">
                {
                  uploadProgress ?
                    <div className="h-auto">changing logo...</div> :
                    <Image
                      src={dishDetails?.foodImage.toString()}
                      width={800}
                      height={800}
                      className="object-cover h-[250px]"
                      alt="Picture of the author"
                    />
                }
              </div> :
              <div className="h-[15rem] rounded-sm flex flex-col items-center justify-center bg-secondary cursor-pointer">
                {
                  uploadProgress ?
                    <span className="text-sm">uploading...</span> :
                    <>
                      <p className="text-sm font-semibold">Click to upload</p>
                      <span className="text-xs text-gray-500">PNG, JPG, JPEG (800x800)</span>
                    </>
                }
              </div>
          }
        </label>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
            Dish name
          </Label>
          <Input placeholder="@name" onChange={(e) => setDishDetails({ ...dishDetails, foodName: e.target.value })} />
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
              Category
            </Label>
            <Select defaultValue={dishDetails.category.toString()} onValueChange={(value) => setDishDetails({ ...dishDetails, category: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {
                  categories.map((item: any) =>
                    <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>)
                }
              </SelectContent>
            </Select>
          </div>
          {
            subCategories.length > 0 && <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
                Sub-Category
              </Label>
              <Select defaultValue={dishDetails.subCategory.toString()} onValueChange={(value) => setDishDetails({ ...dishDetails, subCategory: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    subCategories.map((item: any) =>
                      <SelectItem value={item._id} key={item._id}>{item.title}</SelectItem>)
                  }
                </SelectContent>
              </Select>
            </div>
          }
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
              Original Price
            </Label>
            <Input placeholder="₹399" type="number" onChange={(e) => setDishDetails({ ...dishDetails, originalPrice: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-xs text-secondary-foreground font-normal">
              Offer Price
            </Label>
            <Input placeholder="₹399" onChange={(e) => setDishDetails({ ...dishDetails, offerPrice: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddDish}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
