import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    const checkAdmin = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          if (active) {
            setIsAdmin(false);
            setLoading(false);
          }
          return;
        }

        const { data, error: adminError } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (active) {
          setIsAdmin(!adminError && !!data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Admin verification failed:", error);

        if (active) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAdmin();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED]">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

