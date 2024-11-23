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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password can't be empty required",
    }),
})

export default function SignIn() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setIsLoading(true)
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/phone-login`, {
                phoneNumber: values.username,
                password: values.password
            })
            Cookies.set('access_token', data.tokens.access.token)
            router.push('/dashboard')
            console.log(data.tokens.access.token)
        } catch (err: any) {
            let message;
            let description;
            switch (err?.message) {
                case "Request failed with status code 404":
                    message = "User does not exist";
                    description = "Please create a new account"
                    break;
                case "Request failed with status code 400":
                    message = "Invalid credentials";
                    description = "Invalid phone number or password"
                    break;
                case "Request failed with status code 401":
                    message = "Unauthorized access";
                    description= "Please make sure you have correct access"
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
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full p-4 sm:p-0 h-screen flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Sign in to the dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or phone number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email or phone" {...field} />
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
                                        <FormLabel>Password</FormLabel>
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
                    <div className="mt-3">Don't have an account? <Link href="/register" className="text-primary">Register</Link></div>
                </CardContent>
            </Card>
        </div>
    )
}
