import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, BookOpen, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const formatDate = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const estimateReadingTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchArticle = async () => {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("id, title, category, excerpt, content, image_url, created_at, is_published")
        .eq("id", id)
        .eq("is_published", true)
        .maybeSingle();

      if (!isMounted) return;

      if (fetchError) {
        console.error("Error loading blog article:", fetchError);
        setError("We couldn't load this article right now. Please try again.");
        setArticle(null);
      } else if (!data) {
        setError("This article may have been removed or is not published.");
        setArticle(null);
      } else {
        setArticle(data);
      }

      setLoading(false);
    };

    if (id) fetchArticle();
    else {
      setError("Article not found.");
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#20201e]">
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#333] shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#b18a55]/50 hover:text-[#9a713d]"
        >
          <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        {loading ? (
          <section className="animate-pulse pt-10">
            <div className="mb-4 h-4 w-28 rounded bg-black/10" />
            <div className="mb-3 h-10 max-w-3xl rounded bg-black/10 sm:h-14" />
            <div className="mb-8 h-5 max-w-xl rounded bg-black/10" />
            <div className="mb-8 aspect-[16/8] w-full rounded-3xl bg-black/10" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-black/10" />
              <div className="h-4 w-11/12 rounded bg-black/10" />
              <div className="h-4 w-10/12 rounded bg-black/10" />
            </div>
          </section>
        ) : error ? (
          <section className="mx-auto flex max-w-xl flex-col items-center py-24 text-center">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle size={26} />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight">Article unavailable</h1>
            <p className="mt-3 leading-7 text-black/60">{error}</p>
            <Link
              to="/blog"
              className="mt-7 rounded-full bg-[#20201e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9a713d]"
            >
              Explore all articles
            </Link>
          </section>
        ) : article ? (
          <article className="pt-8 sm:pt-12">
            <header className="mx-auto max-w-3xl text-center">
              {article.category && (
                <span className="inline-flex rounded-full border border-[#b18a55]/30 bg-[#b18a55]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#946a35]">
                  {article.category}
                </span>
              )}

              <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-black/55">
                {article.created_at && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(article.created_at)}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  {estimateReadingTime(article.content || article.excerpt || "")}
                </span>
              </div>
            </header>

            {article.image_url && (
              <div className="group relative mt-9 overflow-hidden rounded-2xl bg-[#e8e3da] shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:mt-12 sm:rounded-3xl">
                <img
                  src={article.image_url}
                  alt={article.title || "Blog article"}
                  className="max-h-[620px] min-h-[240px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:min-h-[360px]"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
              <div className="mb-7 flex items-center gap-3 border-b border-black/10 pb-5 text-sm font-medium text-[#9a713d]">
                <BookOpen size={18} />
                <span>Inside this article</span>
              </div>

              <div className="whitespace-pre-wrap break-words text-[16px] leading-8 text-[#454440] sm:text-[17px] sm:leading-9">
                {article.content?.trim()
                  ? article.content
                  : "The full article content has not been added yet."}
              </div>

              <div className="mt-12 border-t border-black/10 pt-7">
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#20201e] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#9a713d]"
                >
                  <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </main>
  );
}
