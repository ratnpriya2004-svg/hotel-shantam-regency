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
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch enquiries:", error.message);
    throw new Error(error.message);
  }

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
    .select();

  if (error) {
    console.error("Failed to update enquiry status:", error.message);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error(
      "Enquiry update nahi hui. Admin permissions aur enquiry ID check karo."
    );
  }

  return data[0];
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
    .select("id");

  if (error) {
    console.error("Failed to delete enquiry:", error.message);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error(
      "Enquiry delete nahi hui. Admin permissions aur enquiry ID check karo."
    );
  }

  return data[0];
}

