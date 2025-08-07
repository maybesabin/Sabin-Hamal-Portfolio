"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BlogType } from "@/types/blog"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Skeleton components
const BlogsTableSkeleton = () => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Created At</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="text-neutral-500">
            {[1, 2, 3, 4, 5].map((idx) => (
                <TableRow key={idx}>
                    <TableCell className="border-b-black">
                        <div className="h-4 bg-neutral-800 rounded-md animate-pulse"></div>
                    </TableCell>
                    <TableCell className="border-b-black">
                        <div className="h-4 bg-neutral-800 rounded-md animate-pulse w-20"></div>
                    </TableCell>
                    <TableCell className="border-b-black text-right">
                        <div className="h-4 bg-neutral-800 rounded-md animate-pulse w-24 ml-auto"></div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

const BlogDialogSkeleton = () => (
    <div className="bg-neutral-900 text-white text-xs max-w-2xl max-h-[80vh] overflow-y-auto p-6 rounded-lg border border-neutral-700">
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold">Edit Blog</h2>
            </div>
            <div className="flex flex-col items-start gap-4">
                <div className="w-full">
                    <span className="text-xs">Title</span>
                    <div className="h-10 bg-neutral-800 rounded-md animate-pulse mt-2"></div>
                </div>
                <div className="w-full">
                    <span className="text-xs">Category</span>
                    <div className="h-10 bg-neutral-800 rounded-md animate-pulse mt-2"></div>
                </div>
                <div className="w-full">
                    <span className="text-xs">Content</span>
                    <div className="h-[200px] bg-neutral-800 rounded-md animate-pulse mt-2"></div>
                </div>
                <div className="flex gap-2 w-full justify-end mt-4">
                    <div className="h-8 w-16 bg-neutral-800 rounded-md animate-pulse"></div>
                    <div className="h-8 w-24 bg-neutral-800 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
)

const AdminPanel = () => {
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: ""
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        title: "",
        category: "",
        content: ""
    })
    const queryClient = useQueryClient()

    const fetchBlogs = async () => {
        const res = await axios.get("http://localhost:3000/api/blogs")
        return res.data.blogs
    }

    const fetchBlog = async ({ queryKey }: { queryKey: [string, string] }) => {
        const [, slug] = queryKey
        const res = await axios.get(`http://localhost:3000/api/blog/${slug}`)
        return res.data.blog
    }

    const updateBlog = async (slug: string, data: Partial<BlogType>) => {
        const res = await axios.put(`http://localhost:3000/api/blog/${slug}`, data)
        return res.data
    }

    const createBlog = async (data: { title: string; category: string; content: string }) => {
        const res = await axios.post("http://localhost:3000/api/blogs", data, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
            }
        })
        return res.data
    }

    const {
        data: blogs,
        isLoading: blogsLoading,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

    const {
        isLoading: blogLoading,
    } = useQuery({
        queryKey: ["blog", selectedSlug ?? ""],
        queryFn: fetchBlog,
        enabled: !!selectedSlug,
    })

    const handleEditClick = (blog: BlogType) => {
        setSelectedSlug(blog.slug)
        setFormData({
            title: blog.title,
            category: blog.category,
            content: blog.content
        })
        setIsDialogOpen(true)
    }

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCreateInputChange = (field: keyof typeof createFormData, value: string) => {
        setCreateFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async () => {
        if (!selectedSlug) return

        setIsUpdating(true)
        try {
            await updateBlog(selectedSlug, formData)
            await queryClient.invalidateQueries({ queryKey: ["blogs"] })
            await queryClient.invalidateQueries({ queryKey: ["blog", selectedSlug] })

            toast.success("Blog updated successfully!")

            setIsDialogOpen(false)
            setSelectedSlug(null)
            setFormData({ title: "", category: "", content: "" })
        } catch (error) {
            console.error("Error updating blog:", error)
            toast.error("Failed to update blog. Please try again.")
        } finally {
            setIsUpdating(false)
        }
    }

    const handleCreateSubmit = async () => {
        if (!createFormData.title || !createFormData.category || !createFormData.content) {
            toast.error("Please fill in all fields")
            return
        }

        setIsCreating(true)
        try {
            await createBlog(createFormData)
            await queryClient.invalidateQueries({ queryKey: ["blogs"] })
            toast.success("Blog created successfully!")

            setIsCreateDialogOpen(false)
            setCreateFormData({ title: "", category: "", content: "" })
        } catch (error) {
            console.error("Error creating blog:", error)
            toast.error("Failed to create blog. Please try again.")
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="mt-12">
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="text-xs"
                >
                    Create Blog
                </Button>
            </div>
            {blogsLoading ? (
                <BlogsTableSkeleton />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-neutral-500">
                        {blogs?.map((blog: BlogType, idx: number) => {
                            const rawDate = blog.createdAt;
                            const date = new Date(rawDate);
                            const formattedDate = date.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });
                            return (
                                <TableRow key={idx}>
                                    <TableCell
                                        className="border-b-black hover:underline cursor-pointer"
                                        onClick={() => handleEditClick(blog)}
                                    >
                                        {blog.title}
                                    </TableCell>
                                    <TableCell className="border-b-black">
                                        {blog.category}
                                    </TableCell>
                                    <TableCell className="border-b-black text-right">
                                        {formattedDate}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {blogLoading ? (
                    <BlogDialogSkeleton />
                ) : (
                    <DialogContent className="bg-neutral-900 text-white text-xs max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Blog</DialogTitle>
                            <DialogDescription className="flex flex-col items-start gap-4 mt-4">
                                <div className="w-full">
                                    <Label htmlFor="title" className="text-xs">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        className="md:text-xs text-xs mt-2 bg-neutral-800 border-neutral-700"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="category" className="text-xs">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => handleInputChange("category", e.target.value)}
                                        className="md:text-xs text-xs mt-2 bg-neutral-800 border-neutral-700"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="content" className="text-xs">Content</Label>
                                    <textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("content", e.target.value)}
                                        className="md:text-xs mt-2 bg-neutral-800 min-h-[200px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter blog content..."
                                    />
                                </div>
                                <div className="flex gap-2 w-full justify-end mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="text-xs"
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        className="text-xs"
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Updating..." : "Update Blog"}
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                )}
            </Dialog>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="bg-neutral-900 text-white text-xs max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Blog</DialogTitle>
                        <DialogDescription className="flex flex-col items-start gap-4 mt-4">
                            <div className="w-full">
                                <Label htmlFor="create-title" className="text-xs">Title</Label>
                                <Input
                                    id="create-title"
                                    value={createFormData.title}
                                    onChange={(e) => handleCreateInputChange("title", e.target.value)}
                                    className="md:text-xs text-xs mt-2 bg-neutral-800 border-neutral-700"
                                    placeholder="Enter blog title..."
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="create-category" className="text-xs">Category</Label>
                                <Input
                                    id="create-category"
                                    value={createFormData.category}
                                    onChange={(e) => handleCreateInputChange("category", e.target.value)}
                                    className="md:text-xs text-xs mt-2 bg-neutral-800 border-neutral-700"
                                    placeholder="Enter blog category..."
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="create-content" className="text-xs">Content</Label>
                                <textarea
                                    id="create-content"
                                    value={createFormData.content}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleCreateInputChange("content", e.target.value)}
                                    className="md:text-xs mt-2 bg-neutral-800 min-h-[200px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter blog content..."
                                />
                            </div>
                            <div className="flex gap-2 w-full justify-end mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                    className="text-xs"
                                    disabled={isCreating}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCreateSubmit}
                                    className="text-xs"
                                    disabled={isCreating}
                                >
                                    {isCreating ? "Creating..." : "Create Blog"}
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AdminPanel