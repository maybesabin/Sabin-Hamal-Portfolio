import { easeInOut } from "framer-motion";

export const fadeIn = {
    initial: { opacity: 0, y: 0, filter: "blur(7px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
        duration: 0.5,
        ease: easeInOut
    },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0 },
}

export const fadeUp = {
    initial: { opacity: 0, y: 15, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
        duration: 0.5,
        ease: easeInOut
    },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0 },
}