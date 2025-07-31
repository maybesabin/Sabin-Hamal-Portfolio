import connectToDb from "@/lib/db";
import Blog from "@/models/blog";
import { handleError } from "@/utils/handleError";
import { errorResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        await connectToDb()
        const { slug } = await params;
        const blog = await Blog.findOne({ slug })

        if (!blog) return errorResponse("Blog not found");

        return NextResponse.json({
            message: "Blog fetched successfully",
            blog
        }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}