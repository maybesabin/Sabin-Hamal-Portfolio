import connectToDb from "@/lib/db";
import Blog from "@/models/blog";
import { handleError } from "@/utils/handleError";
import { errorResponse, successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectToDb()

        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (token !== process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) return errorResponse("Unauthorized user");

        const { title, content, category } = await req.json();

        if (!title || !content) return errorResponse("Please provide required fields")

        const slug = title.toLowerCase().replace(/ /g, "-")

        const blog = new Blog({
            title,
            slug,
            content,
            category
        })

        await blog.save()
        return successResponse("Blog created successfully")
    } catch (error) {
        return handleError(error)
    }
}

export async function GET() {
    try {
        await connectToDb()
        const blogs = await Blog.find()
        return NextResponse.json({
            message: "Blogs fetched successfully",
            blogs
        }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}