"use client"

import { fadeIn, fadeUp } from "../utils/animation"
import { motion } from "framer-motion"

const Contact = () => {
    const socials = [
        { title: "twitter/x", link: "https://x.com/sabinhamal_" },
        { title: "github", link: "https://github.com/maybesabin" },
        { title: "linkedin", link: "https://www.linkedin.com/in/sabinhamal/" },
        { title: "instagram", link: "https://www.instagram.com/codeandlifts/" }
    ]

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.9 }}
            className="w-full"
        >
            <h2 className="text-sm mt-4">contact</h2>

            <div className="flex items-center gap-2 flex-wrap mt-2">
                {socials.map((item, idx) => (
                    <motion.a
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        viewport={fadeIn.viewport}
                        transition={{ ...fadeIn.transition, delay: 0.9 + 0.2 * idx }}
                        target="_blank"
                        href={item.link}
                        className="text-xs rounded-full bg-neutral-800 hover:bg-neutral-700 transition-all px-3 py-1"
                        key={idx}>
                        {item.title}
                    </motion.a>
                ))}
            </div>
        </motion.div>
    )
}

export default Contact