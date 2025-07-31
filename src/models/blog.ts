import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", BlogSchema);

if (mongoose.models.Blog) {
    delete mongoose.models.Blog
}

export default Blog;