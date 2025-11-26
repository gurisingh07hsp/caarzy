import mongoose from "mongoose";
export interface IBlog extends mongoose.Document {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  featuredImage: string;
  readTime: number;
  tags: string[];
  // SEO Fields
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  slug: string;
  canonicalUrl: string;
  publishDate: any;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: {type: String, required: true, trim: true},
  excerpt: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  author: {type: String, required: true, trim: true},
  category: {type: String, required: true, trim: true},
  image: {type: String},
  featuredImage: {type: String},
  readTime: {type: Number, trim: true},
  tags: [{type: String}],
  // SEO Fields
  metaTitle: {type: String, trim: true},
  metaDescription: {type: String},
  focusKeyword: {type: String},
  slug: {type: String, required: true, trim: true},
  canonicalUrl: {type: String, trim: true},
  publishDate: { type: Date, default: Date.now() }
});

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;