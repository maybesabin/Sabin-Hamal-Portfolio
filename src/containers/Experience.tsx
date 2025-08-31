"use client"

import { fadeUp } from "@/utils/animation"
import { motion } from "framer-motion"
import { Building2, Calendar } from "lucide-react"

const Experience = () => {
    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.7 }}
            className="flex flex-col items-start gap-2 mt-4"
        >
            <h2 className="text-sm mb-1">experience</h2>

            <motion.div
                className="w-full border rounded-xl p-4"
            >
                <div className="w-full flex items-center justify-between">
                    <h3 className="md:text-sm text-xs font-medium">
                        Full stack developer
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Calendar className="md:size-3.5 size-2" />
                        <span>November 2024 - Present</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-1 text-neutral-400">
                    <Building2 className="md:size-4.5 size-3" />
                    <span className="text-xs">
                        <a href="#" className="hover:text-white transition-all">E-pravidi</a>
                        &nbsp;Kathmandu
                    </span>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Experience