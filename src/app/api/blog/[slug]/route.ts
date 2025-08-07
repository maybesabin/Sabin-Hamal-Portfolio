import connectToDb from "@/lib/db";
import Blog from "@/models/blog";
import { BlogType } from "@/types/blog";
import { handleError } from "@/utils/handleError";
import { errorResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectToDb();
        const { slug } = await params;
        const blog = await Blog.findOne({ slug });

        if (!blog) return errorResponse("Blog not found");

        return NextResponse.json({
            message: "Blog fetched successfully",
            blog
        }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectToDb();
        const { slug } = await params;
        const body = await req.json();

        const { title, category, content } = body;

        const updateData: Partial<BlogType> = {};
        if (title !== undefined) updateData.title = title;
        if (category !== undefined) updateData.category = category;
        if (content !== undefined) updateData.content = content;

        const updatedBlog = await Blog.findOneAndUpdate(
            { slug },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) return errorResponse("Blog not found");

        return NextResponse.json({
            message: "Blog updated successfully",
            blog: updatedBlog
        }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}