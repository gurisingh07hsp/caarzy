'use client';

import React, { useState, useRef } from 'react';
import { BlogPost } from '@/types/BlogPost';
import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, Upload, Image, Bold, Italic, List, Link, Quote, Type } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogAdminProps {
  blogs: BlogPost[];
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

export function BlogAdmin({ blogs, onAddBlog, onUpdateBlog, onDeleteBlog }: BlogAdminProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    featuredImage: '',
    readTime: 5,
    tags: [] as string[],
    // SEO Fields
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    slug: '',
    canonicalUrl: '',
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const featuredImageInputRef = useRef<HTMLInputElement>(null);

  // Generate URL slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Auto-generate meta title and slug when title changes
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      metaTitle: prev.metaTitle || title, // Auto-fill meta title if empty
      slug: prev.slug || generateSlug(title) // Auto-generate slug if empty
    }));
  };

  // Auto-generate meta description when excerpt changes
  const handleExcerptChange = (excerpt: string) => {
    setFormData(prev => ({
      ...prev,
      excerpt,
      metaDescription: prev.metaDescription || excerpt // Auto-fill meta description if empty
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image: '',
      featuredImage: '',
      readTime: 5,
      tags: [],
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
      slug: '',
      canonicalUrl: '',
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  // Image upload functionality
  const handleImageUpload = async (file: File, type: 'image' | 'featuredImage') => {
    if (!file) return;
    
    const uploadingState = type === 'image' ? setUploadingImage : setUploadingFeaturedImage;
    uploadingState(true);
    
    try {
      // In a real app, you would upload to a service like Cloudinary, AWS S3, etc.
      // For demo purposes, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'image') {
          setFormData(prev => ({ ...prev, image: result }));
        } else {
          setFormData(prev => ({ ...prev, featuredImage: result }));
        }
        uploadingState(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      uploadingState(false);
    }
  };

  // Content formatting functions
  const formatText = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const before = formData.content.substring(0, start);
    const after = formData.content.substring(end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `### ${selectedText}`;
        break;
      case 'h4':
        formattedText = `#### ${selectedText}`;
        break;
      case 'h5':
        formattedText = `##### ${selectedText}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          formattedText = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          formattedText = `![${selectedText}](${imageUrl})`;
        } else {
          return;
        }
        break;
    }
    
    const newContent = before + formattedText + after;
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBlog) {
       const newBlog: BlogPost = {
        _id: editingBlog?._id || '',
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        publishDate: ((editingBlog as any)?.publishDate) || new Date().toISOString().split('T')[0],
        category: formData.category,
        image: formData.image,
        featuredImage: formData.featuredImage,
        readTime: formData.readTime,
        tags: formData.tags,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        focusKeyword: formData.focusKeyword,
        slug: formData.slug || generateSlug(formData.title),
        canonicalUrl: formData.canonicalUrl,
      };
      onUpdateBlog(newBlog);
    } else {
      const newBlog: BlogPost = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        publishDate: ((editingBlog as any)?.publishDate) || new Date().toISOString().split('T')[0],
        category: formData.category,
        image: formData.image,
        featuredImage: formData.featuredImage,
        readTime: formData.readTime,
        tags: formData.tags,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        focusKeyword: formData.focusKeyword,
        slug: formData.slug || generateSlug(formData.title),
        canonicalUrl: formData.canonicalUrl,
      };
      onAddBlog(newBlog);
    }
    
    resetForm();
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      featuredImage: (blog as any).featuredImage || '',
      readTime: blog.readTime,
      tags: blog.tags,
      metaTitle: (blog as any).metaTitle || '',
      metaDescription: (blog as any).metaDescription || '',
      focusKeyword: (blog as any).focusKeyword || '',
      slug: (blog as any).slug || '',
      canonicalUrl: (blog as any).canonicalUrl || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      onDeleteBlog(id);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex lg:flex-row flex-col gap-2 lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Blog
        </button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Buying Guide">Buying Guide</option>
                  <option value="Technology">Technology</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Budget Cars">Budget Cars</option>
                  <option value="Luxury Cars">Luxury Cars</option>
                  <option value="Electric Vehicles">Electric Vehicles</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (minutes)</label>
                <input
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="Or enter image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => featuredImageInputRef.current?.click()}
                  disabled={uploadingFeaturedImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  {uploadingFeaturedImage ? 'Uploading...' : 'Upload'}
                </button>
                <input
                  ref={featuredImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'featuredImage');
                  }}
                  className="hidden"
                />
              </div>
              {formData.featuredImage && (
                <div className="mt-2">
                  <img
                    src={formData.featuredImage}
                    alt="Featured preview"
                    className="w-32 h-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Content Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Image</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Or enter image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  {uploadingImage ? 'Uploading...' : 'Upload'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'image');
                  }}
                  className="hidden"
                />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Content preview"
                    className="w-32 h-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              
              {/* Content Formatting Toolbar */}
              <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => formatText('h1')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900 font-bold"
                  title="Heading 1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => formatText('h2')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900 font-bold text-sm"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => formatText('h3')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900 font-bold text-xs"
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => formatText('h4')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900 font-bold text-xs"
                  title="Heading 4"
                >
                  H4
                </button>
                <button
                  type="button"
                  onClick={() => formatText('h5')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900 font-bold text-xs"
                  title="Heading 5"
                >
                  H5
                </button>
                <button
                  type="button"
                  onClick={() => formatText('quote')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="Quote"
                >
                  <Quote className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('list')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="List"
                >
                  <List className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() => formatText('link')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="Add Link"
                >
                  <Link className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => formatText('image')}
                  className="p-2 hover:bg-gray-200 rounded text-gray-700 hover:text-gray-900"
                  title="Add Image"
                >
                  <Image className="h-4 w-4" />
                </button>
              </div>
              
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border-t-0"
                rows={8}
                placeholder="Write your blog content here... Use the toolbar above to format text or select text and click a formatting button."
                required
              />
              
              {/* Content Preview */}
              {formData.content && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                  <div className="prose prose-sm max-w-none">
                    {/* <pre className="whitespace-pre-wrap text-sm text-gray-600">
                      {formData.content}
                    </pre> */}
                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a tag and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag(e.currentTarget.value.trim());
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* SEO Settings Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SEO Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                    <span className="text-gray-500 text-xs ml-1">({formData.metaTitle.length}/60)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO title for search engines"
                    maxLength={60}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formData.metaTitle.length > 60 ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <p className={`text-xs mt-1 ${
                    formData.metaTitle.length > 60 ? 'text-red-500' : 
                    formData.metaTitle.length > 50 ? 'text-yellow-500' : 'text-gray-500'
                  }`}>
                    {formData.metaTitle.length > 60 ? 'Title too long!' : 
                     formData.metaTitle.length > 50 ? 'Good length' : 'Recommended: 50-60 characters'}
                  </p>
                </div>

                {/* Focus Keyword */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keyword</label>
                  <input
                    type="text"
                    value={formData.focusKeyword}
                    onChange={(e) => setFormData(prev => ({ ...prev, focusKeyword: e.target.value }))}
                    placeholder="Main keyword for this post"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Meta Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                  <span className="text-gray-500 text-xs ml-1">({formData.metaDescription.length}/160)</span>
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Brief description for search engine results"
                  maxLength={160}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formData.metaDescription.length > 160 ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <p className={`text-xs mt-1 ${
                  formData.metaDescription.length > 160 ? 'text-red-500' : 
                  formData.metaDescription.length > 150 ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {formData.metaDescription.length > 160 ? 'Description too long!' : 
                   formData.metaDescription.length > 150 ? 'Good length' : 'Recommended: 150-160 characters'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* URL Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">/blog/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      Auto
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly version of your title
                    {formData.slug && (
                      <span className="block mt-1 text-blue-600">
                        Full URL: /blog/{formData.slug}
                      </span>
                    )}
                  </p>
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                  <input
                    type="url"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                    placeholder="https://example.com/blog/post-url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Preferred URL for this content (optional)</p>
                </div>
              </div>

              {/* SEO Preview */}
              {(formData.metaTitle || formData.metaDescription) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Search Engine Preview:</h4>
                  <div className="border border-gray-200 rounded p-3 bg-white">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {formData.metaTitle || formData.title}
                    </div>
                    <div className="text-green-600 text-sm">
                      {formData.canonicalUrl || `https://autodeal.com/blog/${formData.slug || generateSlug(formData.title)}`}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                      {formData.metaDescription || formData.excerpt}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Blog Posts ({blogs.length})</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
        {blogs.map((blog) => (
            <div key={blog._id} className="p-6 hover:bg-gray-50 transition-colors overflow-x-auto">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex lg:flex-row flex-col lg:items-center gap-4 mb-2">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{blog.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {blog.category}
                        </div>
                        <span>{blog.readTime} min read</span>
                      </div>
                      {/* SEO Data Display */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(blog as any).metaTitle && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            SEO Title: {(blog as any).metaTitle.length}/60
                          </span>
                        )}
                        {(blog as any).focusKeyword && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Keyword: {(blog as any).focusKeyword}
                          </span>
                        )}
                        {(blog as any).slug && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                            Slug: /blog/{(blog as any).slug}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id as string)}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}




