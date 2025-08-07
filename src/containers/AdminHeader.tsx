"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/utils/animation"
import BackButton from "@/components/back-button"
import { useGlobalContext } from "@/app/contexts/global-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const AdminHeader = () => {
    const router = useRouter()
    const { setIsLoggedIn } = useGlobalContext()
    const handleLogout = () => {
        setIsLoggedIn(false)
        router.push('/admin/login')
    }

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="flex flex-col items-start gap-4"
        >
            <div className="w-full flex items-center justify-between md:text-sm text-xs text-neutral-400">
                <BackButton
                    text="back to portfolio"
                    href="/"
                />
                <Button
                    onClick={handleLogout}
                    size={'sm'}
                    variant={"outline"}
                    className="md:text-xs text-xs"
                >
                    logout
                </Button>
            </div>

            <h2 className="mt-6 lg:text-4xl text-3xl">
                admin
            </h2>

            <p className="text-neutral-400 text-xs lg:w-1/2 w-full">
                create & manage your blogs.
            </p>
        </motion.div>
    )
}

export default AdminHeader