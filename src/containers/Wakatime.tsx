"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { fadeIn } from "@/utils/animation";

const Wakatime = () => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)

        // Dynamically import and register ldrs only on the client
        import("ldrs").then(({ infinity }) => {
            infinity.register()
        })
    }, [])

    const wakatimeUrl = 'https://wakatime.com/@sabinhamal_'
    const [totalTime, setTotalTime] = useState<null | string>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchContributions = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/wakatime`);
            setTotalTime(response.data?.data[0]?.grand_total?.text)
            setError(null);
            setLoading(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError("Failed to fetch contributions.");
                console.log(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchContributions() }, [])

    return (
        <motion.a
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: 1 }}
            target="_blank"
            href={wakatimeUrl}
            className="text-xs text-neutral-500 hover:text-neutral-400 cursor-pointer mt-2 transition-all">

            {
                loading ?
                    isClient &&
                    //@ts-expect-error: Custom element 'l-infinity' is not recognized by TypeScript
                    <l-infinity
                        size="25"
                        stroke="2"
                        stroke-length="0.15"
                        bg-opacity="0.1"
                        speed="1.3"
                        color="white"
                    />
                    :
                    (totalTime == null || totalTime == `0 secs`) ?
                        `i didn't code today` :
                        `i coded ${totalTime} today`
            }
            {(!loading && error) && 'failed to fetch data'}
        </motion.a>
    )
}

export default Wakatime