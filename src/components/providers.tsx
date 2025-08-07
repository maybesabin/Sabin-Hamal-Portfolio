"use client"

import { ThemeProvider } from "./theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react"
import { GlobalProvider } from "@/app/contexts/global-context"

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <GlobalProvider>
                    <Toaster />
                    {children}
                </GlobalProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default Providers