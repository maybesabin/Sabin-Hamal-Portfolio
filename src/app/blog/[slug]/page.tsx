"use client"

import { motion } from "framer-motion"
import { fadeUp } from "@/utils/animation";
import Blog from "./blog";

const page = () => {
    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="flex flex-col items-start gap-4"
        >
            <Blog />
        </motion.div>
    )
}

export default page