import { IconArrowNarrowLeft } from "@tabler/icons-react"
import Link from "next/link"

const BlogHeader = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <div className="w-full flex items-center justify-between md:text-sm text-xs text-neutral-400">
                <Link
                    className="flex items-center gap-1 hover:text-white transition-all"
                    href={'/'}
                >
                    <IconArrowNarrowLeft className="md:size-5 size-4" />
                    <span>back to portfolio</span>
                </Link>
                <h5>
                    {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })}
                </h5>
            </div>

            <h2 className="mt-6 lg:text-4xl text-3xl">
                blogs
            </h2>

            <p className="text-neutral-400 text-xs lg:w-1/2 w-full">
                thoughts on development, technology, and building things that matter. sharing insights from my journey as a full stack developer.
            </p>
        </div>
    )
}

export default BlogHeader