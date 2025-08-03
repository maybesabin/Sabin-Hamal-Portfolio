"use client"

import { BlogType } from "@/types/blog"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { fadeIn, fadeUp } from "@/utils/animation"

const BlogsContainer = () => {

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute)
        return minutes;
    }

    const fetchBlogs = async (): Promise<BlogType[]> => {
        const res = await axios.get("http://localhost:3000/api/blogs")
        return res.data.blogs
    }

    const { data: blogs, isLoading, isError, error } = useQuery<BlogType[]>({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    return (
        <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.5 }}
            className="mt-12"
        >
            {isLoading && (
                Array.from({ length: 3 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="group border-b border-b-neutral-800 pb-6 mb-6 w-full flex flex-col items-start gap-3.5"
                    >
                        <div className="w-full flex items-center gap-1">
                            <div className="w-32 py-3 bg-neutral-800 animate-pulse rounded-md" />
                            <div className="w-32 py-3 bg-neutral-800 animate-pulse rounded-md" />
                            <div className="w-20 py-3 bg-neutral-800 animate-pulse rounded-md" />
                        </div>
                        <h2 className="w-full h-10 bg-neutral-800 animate-pulse rounded-md"></h2>
                        <div className="w-full h-18 bg-neutral-800 animate-pulse rounded-md"></div>
                    </div>
                ))
            )}

            {!isLoading && error && (
                <p className="text-neutral-400 text-xs">
                    {error instanceof Error ? error.message : "Failed to load blogs."}
                </p>
            )}

            {!isLoading && !isError && blogs?.length === 0 && (
                <p className="text-neutral-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">:/ no blogs found</p>
            )}

            {blogs?.map((blog, idx) => {
                const rawDate = blog.createdAt;
                const date = new Date(rawDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                return (
                    <Link
                        key={idx}
                        href={`/blog/${blog.slug}`}
                    >
                        <motion.div
                            className="group border-b pb-6 mb-6 w-full flex flex-col items-start gap-3.5"
                            initial={fadeIn.initial}
                            animate={fadeIn.animate}
                            transition={{ ...fadeIn.transition, delay: 0.5 + idx * 0.09 }}
                        >
                            <div className="w-full flex items-center justify-between text-neutral-400">
                                <div className="flex items-center gap-1 text-xs">
                                    <Calendar className="size-3.5" />
                                    <span className="mr-4">{formattedDate}</span>

                                    <Clock className="size-3.5" />
                                    <span className="mr-4">
                                        {getReadingTime(blog.content)}{" "}
                                        {getReadingTime(blog.content) <= 1 ? "minute" : "minutes"} read
                                    </span>

                                    <div className="border rounded-md px-2 py-1">
                                        {blog.category?.toLowerCase()}
                                    </div>
                                </div>
                                <ArrowUpRight className="size-4 md:flex hidden group-hover:text-white cursor-pointer" />
                            </div>
                            <h2 className="font-medium md:text-2xl text-xl hover:text-neutral-300 transition-all">
                                {blog.title}
                            </h2>
                            <div className="text-neutral-400 md:text-sm text-xs">
                                <ReactMarkdown>{blog.content.split(".")[0] + "."}</ReactMarkdown>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </motion.div >
    )


}

export default BlogsContainer