"use client"

import { IconBrandReact, IconBrandNextjs, IconBrandTypescript, IconBrandTailwind, IconBrandNodejs, IconBrandMongodb, IconBrandJavascript, IconBrandFramerMotion, IconBrandGit, IconBrandGithub, IconBrandVercel } from "@tabler/icons-react"
import { motion } from "framer-motion"
import { fadeIn, fadeUp } from "../utils/animation"

const Skills = () => {

    const skills = [
        { title: "React JS", icon: <IconBrandReact className="md:size-[15px] size-[10px]" /> },
        { title: "Next JS", icon: <IconBrandNextjs className="md:size-[15px] size-[10px]" /> },
        { title: "Javascript", icon: <IconBrandJavascript className="md:size-[15px] size-[10px]" /> },
        { title: "Typescript", icon: <IconBrandTypescript className="md:size-[15px] size-[10px]" /> },
        { title: "Tailwind CSS", icon: <IconBrandTailwind className="md:size-[15px] size-[10px]" /> },
        { title: "Node JS", icon: <IconBrandNodejs className="md:size-[15px] size-[10px]" /> },
        {
            title: "Express JS", icon: <svg xmlns="http://www.w3.org/2000/svg" className="md:size-[17px] size-[10px] fill-white" viewBox="0 0 50 50">
                <path d="M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z"></path>
            </svg>
        },
        { title: "MongoDB", icon: <IconBrandMongodb className="md:size-[15px] size-[10px]" /> },
        { title: "Motion", icon: <IconBrandFramerMotion className="md:size-[15px] size-[10px]" /> },
        { title: "Git", icon: <IconBrandGit className="md:size-[15px] size-[10px]" /> },
        { title: "Github", icon: <IconBrandGithub className="md:size-[15px] size-[10px]" /> },
        { title: "Shadcn", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="md:size-[12px] size-[10px]"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line></svg> },
        { title: "Vercel", icon: <IconBrandVercel className="md:size-[15px] size-[10px]" /> }
    ]

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.6 }}
            className="flex flex-col items-start gap-2 mt-4"
        >
            <h2 className="text-sm mb-1">skills</h2>

            <div className="w-full flex flex-wrap gap-2">
                {skills.map((item, idx) => (
                    <motion.div
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={{ ...fadeIn.transition, delay: 0.65 + idx * 0.09 }}
                        key={idx} className="border-neutral-800 border cursor-pointer hover:bg-neutral-700 transition-all rounded-lg px-2 py-1.5 flex items-center gap-2">
                        {item.icon}
                        <h3 className="text-xs">{item.title}</h3>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Skills