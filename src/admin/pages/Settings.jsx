import { useCallback, useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Hotel,
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  LockKeyhole,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

const SETTINGS_ID = "global";

const INITIAL_SETTINGS = {
  hotelName: "Shantam Regency",
  hotelEmail: "",
  hotelPhone: "",
  hotelAddress: "",

  adminName: "",
  adminEmail: "",

  emailNotifications: true,
  enquiryNotifications: true,
  eventNotifications: true,

  pageTitle: "Hotel Shantam Regency",
  metaDescription: "",
  trackingId: "",
};

const TABS = [
  { id: "hotel", label: "Hotel Information", icon: Hotel },
  { id: "profile", label: "Admin Profile", icon: UserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "seo", label: "SEO & Tracking", icon: SettingsIcon },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10";

const labelClass = "text-sm font-medium text-stone-700";

function getErrorMessage(error) {
  if (!error) return "Something went wrong.";

  if (
    error.code === "42P01" ||
    error.code === "PGRST205"
  ) {
    return "Settings table nahi mili. Pehle Supabase SQL query run karo.";
  }

  if (
    error.code === "42501" ||
    error.code === "PGRST301"
  ) {
    return "Permission denied. Supabase login aur admin RLS policy check karo.";
  }

  return error.message || "Something went wrong.";
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows,
  maxLength,
}) {
  const commonProps = {
    value: value ?? "",
    onChange,
    placeholder,
    maxLength,
    className: inputClass,
  };

  return (
    <div className="min-w-0">
      <label className={labelClass}>{label}</label>

      {rows ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}
    </div>
  );
}

function Toggle({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-stone-200 p-4 transition hover:bg-stone-50">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-amber-600"
      />
    </label>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [savedSettings, setSavedSettings] = useState(INITIAL_SETTINGS);

  const [activeTab, setActiveTab] = useState("hotel");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notice, setNotice] = useState(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setNotice(null);
  };

  // Load saved settings from Supabase.
  const loadSettings = useCallback(async () => {
    setLoading(true);
    setNotice(null);

    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("settings")
        .eq("id", SETTINGS_ID)
        .maybeSingle();

      if (error) throw error;

      const loadedSettings = {
        ...INITIAL_SETTINGS,
        ...(data?.settings || {}),
      };

      setSettings(loadedSettings);
      setSavedSettings(loadedSettings);
    } catch (error) {
      console.error("Settings load error:", error);

      setNotice({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Save settings to Supabase.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!settings.hotelName.trim()) {
      setNotice({
        type: "error",
        message: "Hotel name is required.",
      });

      setActiveTab("hotel");
      return;
    }

    if (
      settings.hotelEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.hotelEmail)
    ) {
      setNotice({
        type: "error",
        message: "Please enter a valid hotel email address.",
      });

      setActiveTab("hotel");
      return;
    }

    if (
      settings.adminEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.adminEmail)
    ) {
      setNotice({
        type: "error",
        message: "Please enter a valid admin email address.",
      });

      setActiveTab("profile");
      return;
    }

    setSaving(true);
    setNotice(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error(
          "Please log in to your admin account before saving settings."
        );
      }

      const payload = {
        id: SETTINGS_ID,
        settings,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      };

      const { error } = await supabase
        .from("admin_settings")
        .upsert(payload, { onConflict: "id" });

      if (error) throw error;

      setSavedSettings({ ...settings });

      setNotice({
        type: "success",
        message: "Settings successfully saved to the database.",
      });
    } catch (error) {
      console.error("Settings save error:", error);

      setNotice({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setSaving(false);
    }
  };

  // Reset unsaved form changes to the last saved values.
  const resetForm = () => {
    setSettings({ ...savedSettings });

    setNotice({
      type: "success",
      message: "Unsaved changes have been discarded.",
    });
  };

  // Change the password of the currently authenticated Supabase user.
  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setNotice(null);

    if (newPassword.length < 8) {
      setNotice({
        type: "error",
        message: "Password must contain at least 8 characters.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setNotice({
        type: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setChangingPassword(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;
      if (!session?.user) {
        throw new Error("Please log in before changing your password.");
      }

      // Ensure we update the password for the currently signed-in account.
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      if (!data?.user?.id || data.user.id !== session.user.id) {
        throw new Error("Could not verify the updated account. Please sign in again and retry.");
      }

      setNewPassword("");
      setConfirmPassword("");
      setNotice({
        type: "success",
        message: "Supabase accepted the password update. Log out and test the new password.",
      });
    } catch (error) {
      console.error("Password update error:", error);
      setNotice({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setChangingPassword(false);
    }
  };


  // Request a change to the authenticated Supabase account email.
  // Supabase may require confirmation before the new email becomes active.
  const handleEmailChange = async () => {
    const email = String(settings.adminEmail || "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice({
        type: "error",
        message: "Please enter a valid administrator email address.",
      });
      return;
    }

    setChangingEmail(true);
    setNotice(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("Please log in before changing your login email.");

      if (user.email?.toLowerCase() === email) {
        setNotice({
          type: "error",
          message: "This is already the email for your signed-in account.",
        });
        return;
      }

      const { data, error } = await supabase.auth.updateUser({ email });
      if (error) throw error;

      // Keep the display field aligned with the requested email in the form.
      // Save Changes still persists profile display information to admin_settings.
      setNotice({
        type: "success",
        message: data?.user?.new_email
          ? `Email change requested. Confirm the change using the email sent to ${email}.`
          : `Email change request submitted for ${email}. Check your inbox (and spam folder) for confirmation. The change may remain pending until confirmed.`,
      });
    } catch (error) {
      console.error("Email update error:", error);
      setNotice({
        type: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setChangingEmail(false);
    }
  };

  const activeTabInfo = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Header */}
      <header>
        <p className="font-anta text-xs uppercase tracking-[0.2em] text-amber-700">
          Configuration
        </p>

        <h1 className="mt-2 font-anta text-2xl text-stone-900 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Manage hotel details, admin preferences, SEO and security.
        </p>
      </header>

      {/* Notifications */}
      {notice && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
          )}

          <p className="break-words">{notice.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
          <p className="px-3 py-3 font-anta text-[10px] uppercase tracking-[0.16em] text-stone-400">
            General Settings
          </p>

          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setNotice(null);
                  }}
                  className={`flex shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition lg:w-full ${
                    active
                      ? "border-amber-200 bg-amber-50 font-medium text-amber-800"
                      : "border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <section className="min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-stone-100 p-5 sm:p-6">
              <div className="min-w-0">
                <h2 className="font-anta text-lg text-stone-900">
                  {activeTabInfo?.label}
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  Changes are saved to your Supabase database.
                </p>
              </div>

              <button
                type="button"
                onClick={loadSettings}
                disabled={loading || saving}
                title="Reload saved settings"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition hover:bg-stone-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {loading ? (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-stone-500">
                  <RefreshCw
                    size={24}
                    className="animate-spin text-amber-700"
                  />
                  <p className="text-sm">Loading saved settings...</p>
                </div>
              ) : (
                <>
                  {/* Hotel information */}
                  {activeTab === "hotel" && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FormField
                          label="Hotel Name"
                          value={settings.hotelName}
                          onChange={(e) =>
                            updateSetting("hotelName", e.target.value)
                          }
                          placeholder="Hotel Shantam Regency"
                        />
                      </div>

                      <FormField
                        label="Hotel Email"
                        type="email"
                        value={settings.hotelEmail}
                        onChange={(e) =>
                          updateSetting("hotelEmail", e.target.value)
                        }
                        placeholder="hotel@example.com"
                      />

                      <FormField
                        label="Contact Number"
                        type="tel"
                        value={settings.hotelPhone}
                        onChange={(e) =>
                          updateSetting("hotelPhone", e.target.value)
                        }
                        placeholder="Enter contact number"
                      />

                      <div className="sm:col-span-2">
                        <FormField
                          label="Hotel Address"
                          value={settings.hotelAddress}
                          onChange={(e) =>
                            updateSetting("hotelAddress", e.target.value)
                          }
                          placeholder="Enter complete hotel address"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Admin profile */}
                  {activeTab === "profile" && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormField
                        label="Administrator Name"
                        value={settings.adminName}
                        onChange={(e) =>
                          updateSetting("adminName", e.target.value)
                        }
                        placeholder="Enter administrator name"
                      />

                      <FormField
                        label="Administrator Email"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) =>
                          updateSetting("adminEmail", e.target.value)
                        }
                        placeholder="Enter administrator email"
                      />

                      <div className="sm:col-span-2">
                        <button
                          type="button"
                          onClick={handleEmailChange}
                          disabled={changingEmail || loading || saving}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {changingEmail && (
                            <RefreshCw size={15} className="animate-spin" />
                          )}
                          {changingEmail ? "Requesting Email Change..." : "Update Login Email"}
                        </button>
                      </div>

                      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 sm:col-span-2">
                        <p className="text-sm font-medium text-amber-900">
                          Admin profile information
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-amber-800">
                          Administrator Name and Email are also saved as profile display information when you click Save Changes. Use Update Login Email to request a change to the currently authenticated Supabase account. Supabase may require email confirmation before the login email changes.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {activeTab === "notifications" && (
                    <div className="space-y-4">
                      <Toggle
                        title="Email Notifications"
                        description="Enable your preferred email notification setting."
                        checked={settings.emailNotifications}
                        onChange={(value) =>
                          updateSetting("emailNotifications", value)
                        }
                      />

                      <Toggle
                        title="New Enquiry Alerts"
                        description="Enable the preference for new enquiry alerts."
                        checked={settings.enquiryNotifications}
                        onChange={(value) =>
                          updateSetting("enquiryNotifications", value)
                        }
                      />

                      <Toggle
                        title="Event Enquiry Alerts"
                        description="Enable the preference for banquet and event enquiries."
                        checked={settings.eventNotifications}
                        onChange={(value) =>
                          updateSetting("eventNotifications", value)
                        }
                      />

                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                        <p className="text-xs leading-relaxed text-stone-600">
                          These switches save your preferences. Actual emails
                          require an email service and a backend notification
                          workflow.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SEO settings */}
                  {activeTab === "seo" && (
                    <div className="grid grid-cols-1 gap-5">
                      <FormField
                        label="Website Page Title"
                        value={settings.pageTitle}
                        onChange={(e) =>
                          updateSetting("pageTitle", e.target.value)
                        }
                        placeholder="Hotel Shantam Regency"
                        maxLength={100}
                      />

                      <FormField
                        label="Meta Description"
                        value={settings.metaDescription}
                        onChange={(e) =>
                          updateSetting("metaDescription", e.target.value)
                        }
                        placeholder="Describe your hotel for search engines"
                        rows={4}
                        maxLength={320}
                      />

                      <FormField
                        label="Analytics Tracking ID"
                        value={settings.trackingId}
                        onChange={(e) =>
                          updateSetting("trackingId", e.target.value)
                        }
                        placeholder="Enter your approved tracking ID"
                      />

                      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                        <p className="text-sm font-medium text-stone-800">
                          SEO configuration
                        </p>

                        <p className="mt-2 text-xs leading-relaxed text-stone-500">
                          These values are stored in the database. To change
                          the live website's page metadata or activate analytics,
                          the public website must also read these settings and
                          apply the relevant configuration.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Security */}
                  {activeTab === "security" && (
                    <div className="space-y-5">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck
                            size={21}
                            className="mt-0.5 shrink-0 text-emerald-700"
                          />

                          <div>
                            <p className="text-sm font-semibold text-emerald-900">
                              Supabase authentication
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                              Database access must be protected with admin
                              authentication and Row Level Security policies.
                            </p>
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4 rounded-xl border border-stone-200 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <LockKeyhole
                            size={19}
                            className="text-amber-700"
                          />

                          <h3 className="text-sm font-semibold text-stone-800">
                            Change Admin Password
                          </h3>
                        </div>

                        <p className="text-xs leading-relaxed text-stone-500">
                          Changes the password for the currently authenticated
                          Supabase user.
                        </p>

                        <div>
                          <label className={labelClass}>
                            New Password
                          </label>

                          <input
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={newPassword}
                            onChange={(e) =>
                              setNewPassword(e.target.value)
                            }
                            className={inputClass}
                            placeholder="Minimum 8 characters"
                          />
                        </div>

                        <div>
                          <label className={labelClass}>
                            Confirm New Password
                          </label>

                          <input
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            className={inputClass}
                            placeholder="Re-enter new password"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={changingPassword}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50"
                        >
                          {changingPassword && (
                            <RefreshCw
                              size={15}
                              className="animate-spin"
                            />
                          )}

                          Update Password
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            {activeTab !== "security" && (
              <div className="flex flex-wrap justify-end gap-3 border-t border-stone-100 p-5 sm:px-6">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading || saving}
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-600 transition hover:bg-stone-50 disabled:opacity-50"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <RefreshCw size={15} className="animate-spin" />
                  ) : (
                    <Save size={15} />
                  )}

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}