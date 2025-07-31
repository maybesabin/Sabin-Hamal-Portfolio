"use client"

import { motion } from "framer-motion"
import { fadeUp } from "../utils/animation"
import { useEffect, useState } from "react"
import { Cloud } from "lucide-react"

const Header = () => {
    const [temperature, setTemperature] = useState<null | number>(null);

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
            );
            const data = await response.json();
            setTemperature(data.main.temp);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`Error:${error.message}`)
            }
        }
    }
    useEffect(() => {
        fetchWeather();
    }, [])

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
        >
            {temperature &&
                <div
                    className="flex justify-end relative">
                    <div
                        className="group px-2 py-[0.65rem] rounded-md cursor-pointer hover:bg-neutral-900 transition-all flex items-center gap-2">
                        <Cloud size={'15px'} className="text-neutral-400" />
                        <h3 className="text-xs text-neutral-400">{temperature} °C</h3>
                        <div className="group-hover:visible invisible absolute -top-2 right-20 text-xs text-neutral-300 border border-neutral-400 rounded-sm p-1.5">
                            Current temperature of my city
                        </div>
                    </div>

                </div>
            }
            <div className="md:text-2xl text-base tracking-tight flex items-center gap-2">
                i&apos;m <span className="font-semibold">sabin</span>
            </div>
        </motion.div>
    )
}

export default Header