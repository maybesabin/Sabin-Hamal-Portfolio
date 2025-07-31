"use client"

import { motion } from "framer-motion"
import { fadeUp } from "../utils/animation"
import { IconBriefcase } from "@tabler/icons-react"
import Link from "next/link"

const About = () => {
    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="w-full flex flex-col items-start gap-2">
            <p
                className="md:text-sm text-xs text-neutral-400">
                a 19 year old developer from Nepal. I thrive in creating pixel perfect websites. I specialize in
                <span className="text-white inline-block">
                    &nbsp;Frontend Development.&nbsp;
                </span>
                <br className="lg:flex hidden" />I&apos;m available for internships, full time opportunities and freelance projects. Check out my
                <Link href={'/blogs'} className="text-white inline-block">
                    &nbsp;blogs&nbsp;.
                </Link>
            </p>

            <a href="mailto:highsabin987@gmail.com" target="_blank">
                <div
                    className="border-neutral-800 border cursor-pointer hover:bg-neutral-700 transition-all rounded-lg px-2 py-1.5 flex items-center gap-2 mt-2">
                    <IconBriefcase className="md:size-[17px] size-[12px]" />
                    <h3 className="md:text-sm text-xs">Hire Me</h3>
                </div>
            </a>
        </motion.div>
    )
}

export default About