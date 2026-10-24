import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Newspaper,
  Eye,
  EyeOff,
  LoaderCircle,
  RefreshCw,
  ImagePlus,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

const emptyForm = {
  title: "",
  category: "",
  excerpt: "",
  content: "",
  image_url: "",
  is_published: false,
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBlogs(data || []);
    } catch (err) {
      console.error("Load blogs error:", err);
      setError(err.message || "Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const filteredBlogs = blogs.filter((blog) =>
    `${blog.title} ${blog.category || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function openEditForm(blog) {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image_url: blog.image_url || "",
      is_published: Boolean(blog.is_published),
    });
    setSelectedImage(null);
    setImagePreview(blog.image_url || "");
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function uploadImage(file) {
    if (!file) return null;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing. Check your .env file.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be 5 MB or less.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setUploadingImage(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Image upload failed.");
      }

      return data.secure_url;
    } finally {
      setUploadingImage(false);
    }
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      setError("Please enter a blog title and content.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const wasEditing = Boolean(editingId);

    try {
      let imageUrl = form.image_url.trim() || null;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const payload = {
        title: form.title.trim(),
        category: form.category.trim() || "General",
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        image_url: imageUrl,
        is_published: form.is_published,
        updated_at: new Date().toISOString(),
      };

      let result;

      if (wasEditing) {
        result = await supabase
          .from("blogs")
          .update(payload)
          .eq("id", editingId)
          .select()
          .single();
      } else {
        result = await supabase
          .from("blogs")
          .insert([payload])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      setSelectedImage(null);
      setImagePreview("");

      setSuccess(
        wasEditing
          ? "Blog updated successfully!"
          : "Blog created successfully!"
      );

      await loadBlogs();
    } catch (err) {
      console.error("Save blog error:", err);
      setError(err.message || "Unable to save blog.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(id) {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setActionId(id);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSuccess("Blog deleted successfully!");
      await loadBlogs();
    } catch (err) {
      console.error("Delete blog error:", err);
      setError(err.message || "Unable to delete blog.");
    } finally {
      setActionId(null);
    }
  }

  async function togglePublish(blog) {
    setActionId(blog.id);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase
        .from("blogs")
        .update({
          is_published: !blog.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", blog.id);

      if (error) throw error;

      setSuccess(
        blog.is_published
          ? "Blog unpublished successfully!"
          : "Blog published successfully!"
      );

      await loadBlogs();
    } catch (err) {
      console.error("Publish blog error:", err);
      setError(err.message || "Unable to update blog status.");
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Website Content
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">
            Blog Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create, edit and manage your hotel blog articles.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-800"
        >
          <Plus size={18} />
          Add New Blog
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <span>{success}</span>
          <button onClick={() => setSuccess("")} aria-label="Dismiss message">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Blogs</p>
          <h2 className="mt-2 text-3xl font-semibold">{blogs.length}</h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Published</p>
          <h2 className="mt-2 text-3xl font-semibold text-green-700">
            {blogs.filter((blog) => blog.is_published).length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Drafts</p>
          <h2 className="mt-2 text-3xl font-semibold text-amber-700">
            {blogs.filter((blog) => !blog.is_published).length}
          </h2>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900">All Articles</h2>
            <p className="mt-1 text-xs text-gray-500">
              Manage articles displayed on your website.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative block w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-amber-600"
              />
            </label>

            <button
              type="button"
              onClick={loadBlogs}
              disabled={loading}
              title="Refresh blogs"
              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-gray-500">
            <LoaderCircle size={30} className="animate-spin text-amber-700" />
            <p className="mt-3 text-sm">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <Newspaper size={25} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {search ? "No matching blogs" : "No blogs yet"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Create your first blog article to get started."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 rounded-lg border border-amber-700 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50"
              >
                Create First Blog
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Newspaper className="text-gray-400" size={26} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {blog.category || "Uncategorized"}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      blog.is_published
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {blog.is_published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(blog)}
                    disabled={actionId !== null}
                    title={blog.is_published ? "Unpublish" : "Publish"}
                    className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {actionId === blog.id ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : blog.is_published ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditForm(blog)}
                    disabled={actionId !== null}
                    title="Edit blog"
                    className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteBlog(blog.id)}
                    disabled={actionId !== null}
                    title="Delete blog"
                    className="rounded-lg border border-red-100 p-2.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:items-center">
          <div className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId ? "Edit Blog" : "Create New Blog"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the details of your article.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium">
                    Blog Title *
                  </span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter blog title"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-amber-600"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Category</span>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Hotel, Events, Travel..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-amber-600"
                  />
                </label>

                <div className="block">
                  <span className="mb-2 block text-sm font-medium">Blog Image</span>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-700 transition hover:border-amber-600 hover:bg-amber-50">
                    <ImagePlus size={18} className="text-amber-700" />
                    {uploadingImage ? "Uploading image..." : selectedImage ? selectedImage.name : "Choose image (max 5 MB)"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={saving || uploadingImage}
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative mt-3 overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Blog image preview"
                        className="h-44 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview("");
                          setForm((previous) => ({ ...previous, image_url: "" }));
                        }}
                        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-gray-700 shadow hover:bg-white"
                        aria-label="Remove selected image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Image uploads to Cloudinary when you save the blog.
                  </p>
                </div>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium">
                    Short Description
                  </span>
                  <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Write a short summary..."
                    className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-amber-600"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium">
                    Blog Content *
                  </span>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Write your complete blog article..."
                    className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-amber-600"
                  />
                </label>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="h-4 w-4 accent-amber-700"
                />
                <span>
                  <span className="block text-sm font-medium">
                    Publish this blog
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Published blogs can appear on the public website.
                  </span>
                </span>
              </label>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                  disabled={saving}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-5 py-3 text-sm font-medium text-white hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle size={17} className="animate-spin" />
                  )}
                  {saving
                    ? uploadingImage
                      ? "Uploading image..."
                      : "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

