import { supabase } from "../../lib/supabase";

// Allowed enquiry statuses — database ke exact values
export const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Follow-up",
  "Converted",
  "Lost",
];

// Fetch all enquiries from Supabase

export async function getEnquiries() {
  console.log("🔍 Fetching enquiries from Supabase...");

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase Fetch Error:", error);
    throw new Error(error.message);
  }

  console.log("✅ Enquiries received:", data);
  console.log("📊 Total enquiries:", data?.length ?? 0);

  return data ?? [];
}



// Fetch enquiry statistics
export async function getEnquiryStats() {
  const enquiries = await getEnquiries();

  const normalizeStatus = (status) =>
    String(status || "New").trim().toLowerCase();

  return {
    total: enquiries.length,

    new: enquiries.filter(
      (item) => normalizeStatus(item.status) === "new"
    ).length,

    contacted: enquiries.filter(
      (item) => normalizeStatus(item.status) === "contacted"
    ).length,

    followUp: enquiries.filter(
      (item) => normalizeStatus(item.status) === "follow-up"
    ).length,

    converted: enquiries.filter(
      (item) => normalizeStatus(item.status) === "converted"
    ).length,

    lost: enquiries.filter(
      (item) => normalizeStatus(item.status) === "lost"
    ).length,
  };
}

// Update enquiry status
export async function updateEnquiryStatus(id, status) {
  if (!id) {
    throw new Error("Enquiry ID is required.");
  }

  // Accept only the exact status values allowed by the database
  if (!STATUS_OPTIONS.includes(status)) {
    throw new Error("Invalid enquiry status.");
  }

  const { data, error } = await supabase
    .from("enquiries")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update enquiry status:", error.message);
    throw new Error(error.message);
  }

  return data;
}

// Delete an enquiry
export async function deleteEnquiry(id) {
  if (!id) {
    throw new Error("Enquiry ID is required.");
  }

  const { data, error } = await supabase
    .from("enquiries")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error("Failed to delete enquiry:", error.message);
    throw new Error(error.message);
  }

  return data;
}
