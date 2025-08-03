"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios, { AxiosError } from "axios"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const page = () => {
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
            const res = await axios.post("http://localhost:3000/api/auth/login", formData)

            // Handle successful response
            if (res.data?.response?.data?.message) {
                toast.success(res.data.response.data.message)
            } else if (res.data?.message) {
                toast.success(res.data.message)
            } else {
                toast.success("Login successful!")
            }
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
            <div className="w-full">
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

export default page