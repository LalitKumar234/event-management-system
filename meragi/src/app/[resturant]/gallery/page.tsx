import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";


export default function Gallery() {
    return (
        <div className=" bg-primary text-white">
            <div className="p-5">
                <h1 className="text-2xl font-medium">
                    Aahaar's Gallery
                </h1>
                <Button variant="outline" className="text-black mt-2"><IoMdAdd size={20} />Add</Button>
            </div>
            <div className="bg-white text-black pt-5 px-5 h-full rounded-t-3xl mt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="grid gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1600209142000-aa256622e64a?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://plus.unsplash.com/premium_photo-1661549966538-3438f6d6cf8f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://images.unsplash.com/photo-1572477428036-780afd37763f?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div>
                            <img className="h-auto max-w-full rounded-lg" src="https://plus.unsplash.com/premium_photo-1661629192932-ec7cbe70d04d?q=80&w=2968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}