"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/animation";
import { useQuery } from "@tanstack/react-query";

const Github = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Dynamically import and register ldrs only on the client
        import("ldrs").then(({ infinity }) => {
            infinity.register();
        });
    }, []);

    const username = "maybesabin";
    const url = `https://github.com/${username}`;

    const fetchContributions = async (): Promise<number> => {
        const response = await axios.get(
            `https://github-contributions-api.jogruber.de/v4/${username}`
        );
        return response.data?.total?.["2025"] || 0;
    };

    const {
        data: contributions,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["githubContributions", username],
        queryFn: fetchContributions,
        staleTime: 1000 * 60 * 5,
        retry: 1 // retry once on failure
    });

    return (
        <motion.a
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            viewport={fadeIn.viewport}
            transition={{ ...fadeIn.transition, delay: 1 }}
            target="_blank"
            href={url}
            className="text-xs text-neutral-500 hover:text-neutral-400 cursor-pointer mt-2 transition-all"
        >
            {isLoading || contributions == null ? (
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
            ) : (
                `${contributions} contributions this year`
            )}
        </motion.a>
    );
};

export default Github;