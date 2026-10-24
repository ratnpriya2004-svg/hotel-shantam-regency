import { useEffect, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import hotelExteriorImage from "../assets/image/bol.jpg";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPublishedBlogs() {
      setLoading(true);
      setError("");

      try {
        const { data, error: queryError } = await supabase
          .from("blogs")
          .select(
            "id, title, category, excerpt, content, image_url, is_published, created_at"
          )
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;

        if (isMounted) {
          setBlogPosts(data || []);
        }
      } catch (err) {
        console.error("Public blog loading error:", err);
        if (isMounted) {
          setError(
            "Blog articles could not be loaded right now. Please try again later."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPublishedBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#faf8f3] text-[#24211d]">
        <section className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden px-5 py-20 text-center text-white sm:min-h-[500px] md:min-h-[510px] lg:min-h-[540px]">
          <img
            src={hotelExteriorImage}
            alt="Hotel Shantam Regency, Bhagalpur"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#e5c58c] sm:text-sm">
              Hotel Shantam Regency · Bhagalpur
            </p>

            <h1 className="mx-auto max-w-5xl font-serif text-4xl font-medium leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Stories, Ideas &
              <span className="mt-2 block text-[#e5c58c]">
                Inspiration for Every Stay
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
              Read updates and useful information from Hotel Shantam Regency.
              New articles published by our admin will appear here.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#blog-posts"
                className="inline-flex items-center rounded-md bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#171613] transition duration-300 hover:bg-[#f0d7a4]"
              >
                Explore Articles <span className="ml-2 text-lg">↘</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-[#e5c58c] hover:text-[#e5c58c]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-8 md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-[#a78245]">
              The Shantam Journal
            </p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Ideas for better stays,
              <span className="text-[#a78245]"> events & celebrations.</span>
            </h2>
          </div>
          <div className="md:justify-self-end md:pb-1">
            <p className="max-w-xl text-sm leading-7 text-[#777067] md:text-base md:leading-8">
              Helpful updates and articles from Hotel Shantam Regency will be
              shared here. The admin can add and update blog posts through the
              blog management panel.
            </p>
          </div>
        </section>

        <section
          id="blog-posts"
          className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 md:px-8 md:pb-28"
        >
          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
              Read, discover, plan
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">
              Latest Articles
            </h2>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#e5ded2] bg-white px-5 py-16 text-center">
              <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#e5ded2] border-t-[#a78245]" />
              <p className="text-sm text-[#777067]">Loading latest articles...</p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-white px-5 py-12 text-center"
            >
              <h3 className="font-serif text-2xl">Unable to load articles</h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#777067]">
                {error}
              </p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="rounded-2xl border border-[#e5ded2] bg-white px-5 py-16 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5eddf] text-3xl text-[#a78245]">
                ✦
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl">
                New stories are coming soon
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#777067]">
                Our latest blog posts will appear here once they are published
                by the admin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  aria-label={`Read full article: ${post.title}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-[#e5ded2] bg-white text-left shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#a78245] focus:ring-offset-2"
                >
                  {post.image_url && (
                    <div className="h-60 overflow-hidden bg-[#ded5c7] sm:h-64">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {post.category && (
                      <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a78245]">
                        {post.category}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl leading-snug text-[#24211d]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-7 text-[#777067]">
                      {post.excerpt || post.content}
                    </p>
                    {post.created_at && (
                      <p className="mt-4 text-xs text-[#8a8175]">
                        {new Date(post.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section
          id="blog-contact"
          className="relative overflow-hidden bg-[#171613] px-5 py-20 text-center text-white md:py-28"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#e5c58c]">
              Your next chapter starts here
            </p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Planning a stay or special occasion?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              Our team at Hotel Shantam Regency is here to help with your stay,
              event or gathering in Bhagalpur.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+919334271294"
                className="inline-flex rounded-md bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#f0d7a4]"
              >
                Call 09334271294
              </a>
              <a
                href="https://wa.me/919334271294"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#e5c58c] hover:text-[#e5c58c]"
              >
                WhatsApp Us ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
