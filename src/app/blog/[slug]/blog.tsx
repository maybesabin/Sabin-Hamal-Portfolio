"use client"

import BackButton from "@/components/back-button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Calendar, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw";

const Blog = () => {
    const params = useParams();
    const slug = params?.slug;

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute)
        return minutes;
    }

    const fetchBlog = async () => {
        try {
            const res = await axios.get(`/api/blog/${slug}`)
            return res.data.blog
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog"],
        queryFn: fetchBlog,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    const rawDate = blog?.createdAt;
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <>
            <div className="w-full flex items-center justify-between md:text-sm text-xs text-neutral-400">
                <BackButton
                    text="back to blogs"
                    href="/blogs"
                />
                {blog &&
                    <h5 className="text-xs">
                        {formattedDate}
                    </h5>
                }
                {isLoading &&
                    <h5 className="w-20 bg-neutral-800 py-2.5 rounded-md animate-pulse" />
                }
            </div>

            {blog &&
                <>
                    <div className="mt-12 w-full flex items-center gap-1 text-xs text-neutral-400">
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
                    <h1 className="lg:text-3xl text-2xl font-medium">
                        {blog.title}
                    </h1>
                    <div className="text-neutral-400 md:text-sm text-xs">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{blog.content}</ReactMarkdown>
                    </div>
                </>
            }

            {isLoading &&
                <>
                    <div className="mt-12 w-full flex items-center gap-1">
                        <div className="w-32 py-3 bg-neutral-800 animate-pulse rounded-md" />
                        <div className="w-32 py-3 bg-neutral-800 animate-pulse rounded-md" />
                        <div className="w-20 py-3 bg-neutral-800 animate-pulse rounded-md" />
                    </div>
                    <h1 className="w-full h-10 bg-neutral-800 animate-pulse rounded-md"></h1>
                    <div className="w-full h-[40svh] bg-neutral-800 animate-pulse rounded-md"></div>
                </>
            }

            {!isLoading && error && (
                <p className="text-neutral-400 text-xs">
                    {error instanceof Error ? error.message : "Failed to load blog."}
                </p>
            )}

            {!isLoading && !blog && (
                <p className="text-neutral-400 text-sm">:/ blog not found</p>
            )}
        </>
    )
}

export default Blog