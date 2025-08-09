"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/animation";
import { useQuery } from "@tanstack/react-query";

const Wakatime = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Dynamically import and register ldrs only on the client
        import("ldrs").then(({ infinity }) => {
            infinity.register();
        });
    }, []);

    const wakatimeUrl = "https://wakatime.com/@sabinhamal_";

    // React Query Fetch Function
    const fetchContributions = async () => {
        const response = await axios.get(`/api/wakatime`);
        return response.data?.data?.[0]?.grand_total?.text || "";
    };

    const { data: totalTime, isLoading, isError } = useQuery({
        queryKey: ["wakatimeData"],
        queryFn: fetchContributions,
        staleTime: 1000 * 60 * 5,
        retry: 1 // retry once if it fails
    });

    return (
        <motion.a
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: 1 }}
            target="_blank"
            href={wakatimeUrl}
            className="text-xs text-neutral-500 hover:text-neutral-400 cursor-pointer mt-2 transition-all"
        >
            {isLoading ? (
                isClient && (
                    // @ts-expect-error: Custom element 'l-infinity' is not recognized by TypeScript
                    <l-infinity
                        size="25"
                        stroke="2"
                        stroke-length="0.15"
                        bg-opacity="0.1"
                        speed="1.3"
                        color="white"
                    />
                )
            ) : isError ? (
                "failed to fetch data"
            ) : !totalTime || totalTime === "0 secs" ? (
                "i didn't code today"
            ) : (
                `i coded ${totalTime} today`
            )}
        </motion.a>
    );
};

export default Wakatime;