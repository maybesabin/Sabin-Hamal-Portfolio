import { Metadata } from "next";
import pfp from "../../assets/pfp.jpg"

export const metadata: Metadata = {
    title: "Blogs | Sabin Hamal",
    description:
        "Read articles and insights from Sabin Hamal on web development, fullstack development, and frontend frameworks.",
    keywords: [
        "Web Development Blog",
        "Frontend Blog",
        "React Articles",
        "Next.js Tips",
        "UI/UX Design Blog",
    ],
    openGraph: {
        title: "Blogs | Sabin Hamal",
        description:
            "Stay updated with my blogs covering fullstack development, React, Next.js, and design tips.",
        url: "https://sabinhamal.com.np/blogs",
        siteName: "Sabin Hamal Portfolio",
        images: [
            {
                url: pfp.src,
                width: 1200,
                height: 630,
                alt: "Sabin Hamal Blogs Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blogs | Sabin Hamal",
        description:
            "Frontend development insights and UI/UX tips from Sabin Hamal.",
        images: [pfp.src],
    },
};

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