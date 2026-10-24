import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminRoute() {
const [status, setStatus] = useState("checking");

useEffect(() => {
let active = true;

async function verifyAdmin() {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      if (active) setStatus("denied");
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error("Admin verification failed:", adminError);
      if (active) setStatus("denied");
      return;
    }

    if (active) {
      setStatus(admin ? "allowed" : "denied");
    }
  } catch (error) {
    console.error("Authentication check failed:", error);
    if (active) setStatus("denied");
  }
}

verifyAdmin();

return () => {
  active = false;
};


}, []);

if (status === "checking") {
return ( <div className="flex min-h-screen items-center justify-center bg-[#F8F5ED]"> <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D9CBAF] border-t-[#C6A15B]" /> </div>
);
}

if (status === "denied") {
return <Navigate to="/admin" replace />;
}

return <Outlet />;
}
