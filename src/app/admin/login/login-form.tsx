"use client"

import { useGlobalContext } from "@/app/contexts/global-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Eye, EyeClosed } from "lucide-react"

const LoginForm = () => {
    const router = useRouter()
    const { setIsLoggedIn } = useGlobalContext()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields")
            return
        }

        if (!formData.email.includes('@')) {
            toast.error("Please enter a valid email address")
            return
        }

        setIsLoading(true)

        try {
            await axios.post("/api/auth/login", formData)
            toast.success("Login successful!")
            setIsLoggedIn(true)
            router.push("/admin")
        } catch (error) {
            console.error("Login error:", error)

            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Login failed"
                toast.error(errorMessage)
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="text-neutral-400 flex flex-col items-start gap-4 md:w-64 w-full md:px-0 px-6"
        >
            <div className="w-full">
                <Label htmlFor="email" className="text-xs mb-2">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="johndoe@gmail.com"
                    name="email"
                    className="w-full md:text-xs text-xs"
                    disabled={isLoading}
                    required
                />
            </div>
            <div className="w-full relative">
                <Label htmlFor="password" className="text-xs mb-2">Password</Label>
                <Input
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="***********"
                    name="password"
                    className="w-full md:text-xs text-xs"
                    disabled={isLoading}
                    required
                />
                {showPassword ?
                    <Eye onClick={() => setShowPassword(!showPassword)} className="size-4 absolute right-2 top-8.5" /> :
                    <EyeClosed onClick={() => setShowPassword(!showPassword)} className="size-4 absolute right-2 top-8.5" />
                }
            </div>
            <Button
                type="submit"
                size={"sm"}
                className="md:text-xs text-xs w-full mt-2"
                variant={"outline"}
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
        </form>
    )
}

export default LoginForm