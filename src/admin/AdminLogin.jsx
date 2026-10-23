import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Hotel,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Authenticate using Supabase Auth.
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      if (!data.user) {
        throw new Error("Unable to verify your account.");
      }

      // Verify that this authenticated user is a registered admin.
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!admin) {
        await supabase.auth.signOut();
        throw new Error("Access denied. This account is not an admin.");
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.message === "Invalid login credentials"
          ? "Invalid email or password."
          : err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F6F3] px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl lg:grid-cols-2">
        {/* Branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#171714] p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-amber-200/10" />
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-amber-200/10" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white">
              <Hotel size={25} />
            </div>

            <div>
              <p className="font-anta text-lg">SHANTAM</p>
              <p className="text-[10px] tracking-[0.3em] text-amber-200">
                REGENCY
              </p>
            </div>
          </div>

          <div className="relative z-10 py-12">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-amber-300">
              Administration Portal
            </p>

            <h1 className="font-anta text-4xl leading-tight xl:text-5xl">
              Manage your
              <br />
              hospitality business
              <br />
              <span className="text-amber-400">with confidence.</span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-stone-400">
              Manage enquiries, rooms, events, restaurant operations and
              hotel settings from one secure dashboard.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck size={16} className="text-amber-400" />
            Restricted access for authorized administrators
          </div>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#171714] text-amber-400">
                <Hotel size={23} />
              </div>

              <div>
                <h1 className="font-anta text-lg text-stone-900">
                  SHANTAM REGENCY
                </h1>
                <p className="text-xs text-stone-500">Admin Portal</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <LockKeyhole size={23} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Welcome Back
              </p>

              <h2 className="mt-2 font-anta text-3xl text-stone-900">
                Admin Login
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-500">
                Sign in with your authorized administrator account to
                continue.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span className="break-words">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="text-sm font-medium text-stone-700"
                >
                  Email Address
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your admin email"
                    className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-11 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="text-sm font-medium text-stone-700"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-11 pr-12 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#171714] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Verifying Account...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 flex items-start gap-2 border-t border-stone-100 pt-5 text-xs leading-5 text-stone-500">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-amber-700"
              />
              Only accounts registered in the admin_users table can access
              this dashboard.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

