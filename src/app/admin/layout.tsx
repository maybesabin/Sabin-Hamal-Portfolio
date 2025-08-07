"use client"

import ProtectedRoute from "@/components/ProtectedRoute"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectedRoute>
            <div className="w-full min-h-svh md:py-[3vh] py-10 flex items-start justify-center">
                <div className="lg:w-[55rem] w-full lg:px-0 px-6 h-full flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default layout 