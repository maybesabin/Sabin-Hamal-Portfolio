"use client"

import { useGlobalContext } from "@/app/contexts/global-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useGlobalContext()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // If user is on /admin/login and is already logged in, redirect to /admin
        if (pathname === "/admin/login" && isLoggedIn) {
            router.push("/admin")
            return
        }

        // If user is on /admin and is not logged in, redirect to /admin/login
        if (pathname === "/admin" && !isLoggedIn) {
            router.push("/admin/login")
            return
        }
    }, [isLoggedIn, pathname, router])

    // loader
    if (
        (pathname === "/admin/login" && isLoggedIn) ||
        (pathname === "/admin" && !isLoggedIn)
    ) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-400"></div>
            </div>
        )
    }

    return <>{children}</>
}

export default ProtectedRoute 