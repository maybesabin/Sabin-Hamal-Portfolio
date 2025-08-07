import { IconArrowNarrowLeft } from "@tabler/icons-react"
import Link from "next/link"

interface BackButtonProps {
    href: string;
    text: string;
}

const BackButton = ({
    href,
    text
}: BackButtonProps) => {
    return (
        <Link
            className="flex items-center gap-1 hover:text-white transition-all"
            href={`${href}`}
        >
            <IconArrowNarrowLeft className="md:size-5 size-4" />
            <span>{text}</span>
        </Link>
    )
}

export default BackButton