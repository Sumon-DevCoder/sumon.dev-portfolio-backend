import mongoose, { Schema, model, models } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  img: { type: String, required: true },
});

const Blog = mongoose.model<TBlog>("Blog", blogSchema);
export default Blog;
