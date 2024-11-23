"use client"
import Cookies from "js-cookie"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAppDispatch } from "@/store/store";
import { setAuthState } from "@/store/authSlice"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

const formSchema = z.object({
    phoneNumber: z.string().min(10, {
        message: "Please enter a valid phone number",
    }),
    email: z.string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
    resturantName: z.string().min(1, {
        message: "Resturant name is required",
    }),
})

export default function Register() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            phoneNumber: "",
            email: "",
            resturantName: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setIsLoading(true)
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, values)
            // Cookies.set('access_token', data.tokens.access.token)
            router.push('/signin')
            console.log(data.tokens.access.token)
        } catch (err: any) {
            let message;
            let description;
            switch (err?.message) {
                case "Request failed with status code 409":
                    message = "This phone number is taken";
                    description = "Please use another number and try again!"
                    break;
                default:
                    message = "Something went wrong, please contact +91-7903949014";
                    break;
            }
            toast({
                variant: "destructive",
                title: message,
                description: description || "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full p-4 sm:p-0 h-screen flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Sign in to the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="resturantName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Resturant Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: Hi Chai's" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: hichai@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="+91..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>Submit</Button>
                        </form>
                    </Form>
                    <div className="mt-3">Already have an account? <Link href="/signin" className="text-primary">Sign in</Link></div>
                </CardContent>
            </Card>
        </div>
    )
}
