"use client"

import { motion } from "framer-motion"
import { fadeIn, fadeUp } from "../utils/animation"
import { ArrowUpRight } from "lucide-react"

const Projects = () => {

    const projects = [
        {
            title: "Sabin UI",
            description: "A UI library for React & vanilla JavaScript",
            icon: "✨",
            sourceCode: "https://github.com/maybesabin/SabinUI",
            livePreview: "https://sabinui.vercel.app/"
        },
        {
            title: "Revertex",
            description: "A modern animated agency landing page",
            icon: "🔷",
            sourceCode: "https://github.com/maybesabin/Agency-Landing-Page",
            livePreview: "https://revertex.vercel.app/"
        },
        {
            title: "Organic Karnali",
            description: "A fullstack e-commerce site with admin dashboard & checkout functionality",
            icon: "🛒",
            livePreview: "https://karnaliorganics.com/"
        },
        {
            title: "SwiftOps",
            description: "An AI SaaS-themed landing page",
            icon: "🌐",
            sourceCode: "https://github.com/maybesabin/SwiftOps",
            livePreview: "https://swiftops.vercel.app/"
        }
    ];

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.8 }}
            className="w-full flex flex-col items-start gap-3 mt-4"
        >
            <h2 className="text-sm mb-1">projects</h2>

            <div className="flex flex-col items-start gap-4 w-full relative">
                {projects.map((item, idx) => (
                    <motion.div
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={{ ...fadeIn.transition, delay: 0.8 + 0.15 * idx }}
                        className="flex items-end justify-between w-full"
                        key={idx}
                    >
                        <div className="flex items-center">
                            <div className="bg-neutral-800 rounded-lg p-2 md:text-sm text-xs">
                                {item.icon}
                            </div>
                            <div className="flex flex-col items-start">
                                <a
                                    href={item.livePreview}
                                    target="_blank"
                                    className="hover:bg-neutral-800 ml-2 px-2 py-0.5 rounded-full cursor-pointer group lowercase md:text-sm text-xs flex items-center gap-1">
                                    <span>{item.title}</span>
                                    <ArrowUpRight className="group-hover:-mt-0.5 group-hover:ml-0.5 transition-all" size={'15px'} />
                                </a>
                                <p className="pl-4 text-neutral-500 text-xs lowercase">{item.description}</p>
                            </div>
                        </div>
                        {item.sourceCode &&
                            <a
                                href={item.sourceCode}
                                target="_blank"
                                className="text-xs text-neutral-500 hover:text-white transition-all">
                                code
                            </a>
                        }
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Projects