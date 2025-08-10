import { Metadata } from "next"
import axios from "axios"
import pfp from "../../../assets/pfp.jpg"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const { slug } = await params
        const res = await axios.get(`http://localhost:3000/api/blog/${slug}`)
        const blog = res.data.blog

        if (!blog) {
            return {
                title: "Blog Not Found | Sabin Hamal",
                description: "The requested blog post could not be found.",
            }
        }

        return {
            title: `${blog.title} | Sabin Hamal`,
            description: blog.content || "Read this insightful article by Sabin Hamal.",
            keywords: blog.category?.toUpperCase() || ["Web Development", "Frontend", "React"],
            authors: [{ name: "Sabin Hamal", url: "https://sabinhamal.com.np" }],
            openGraph: {
                title: `${blog.title} | Sabin Hamal`,
                description: blog.content || "Read this insightful article by Sabin Hamal.",
                url: `https://sabinhamal.com.np/blog/${slug}`,
                siteName: "Sabin Hamal Portfolio",
                images: [
                    {
                        url: pfp.src,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ],
                locale: "en_US",
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: `${blog.title} | Sabin Hamal`,
                description: blog.content || "Read this insightful article by Sabin Hamal.",
                images: [pfp.src],
            },
        }
    } catch (error) {
        console.error("Error generating metadata:", error)
        return {
            title: "Blog | Sabin Hamal",
            description: "Read insightful articles by Sabin Hamal.",
        }
    }
}

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-svh md:py-[3vh] py-10 flex items-start justify-center">
            <div className="lg:w-[55rem] w-full lg:px-0 px-6 h-full flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}

export default layout