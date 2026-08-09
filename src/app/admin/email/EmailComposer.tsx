"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EmailComposer() {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("STUDY_TIPS");
  const [recipientType, setRecipientType] = useState("ALL_USERS");

  const sendBroadcast = async () => {
    if (!subject.trim()) {
      toast.error("Please enter an email subject line.");
      return;
    }

    if (!body.trim()) {
      toast.error("Please enter email message content.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          body,
          category,
          recipientType,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(`Email sent to ${data.recipients ?? 0} users.`);
        setSubject("");
        setBody("");
      } else {
        toast.error(data.error || "Failed to dispatch broadcast email.");
      }
    } catch {
      toast.error("An error occurred while connecting to the email dispatch service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipient Target Selector */}
          <div className="space-y-2">
            <label htmlFor="recipient-type" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Target Recipient Audience
            </label>
            <select
              id="recipient-type"
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm outline-none focus:border-indigo-500 transition-all font-sans cursor-pointer disabled:opacity-50"
            >
              <option value="ALL_USERS">All Registered Users</option>
              <option value="VERIFIED_USERS">Verified Email Users Only</option>
              <option value="STUDENTS_ROLE">Students Role Only</option>
              <option value="ADMINS_ROLE">Administrators Only</option>
              <option value="STUDY_TIPS_SUBSCRIBERS">Study Tips Subscribers</option>
              <option value="WEEKLY_SUMMARY_SUBSCRIBERS">Weekly Summary Subscribers</option>
              <option value="PRODUCT_UPDATES_SUBSCRIBERS">Product Updates Subscribers</option>
              <option value="AI_ANNOUNCEMENTS">AI Announcement Subscribers</option>
              <option value="CUSTOM">Custom Manual Selection</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label htmlFor="notification-category" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Notification Category
            </label>
            <select
              id="notification-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm outline-none focus:border-purple-500 transition-all font-sans cursor-pointer disabled:opacity-50"
            >
              <option value="STUDY_TIPS_SUBSCRIBERS">Study Tips & Guides</option>
              <option value="WEEKLY_SUMMARY_SUBSCRIBERS">Weekly Summary & Digest</option>
              <option value="PRODUCT_UPDATES_SUBSCRIBERS  STUDY_TIPS">Product Updates & Features</option>
              <option value="AI_ANNOUNCEMENTS_SUBSCRIBERS">AI Announcements & Models</option>
              <option value="CUSTOM_SYSTEM_ANNOUNCEMENT">Custom System Announcement</option>
            </select>
          </div>
        </div>

        {/* Email Subject Line */}
        <div className="space-y-2">
          <label htmlFor="email-subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Email Subject Line
          </label>
          <input
            id="email-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={loading}
            placeholder="e.g. Master Active Recall with AI Study Hub v2.0"
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-600 text-sm outline-none focus:border-indigo-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* Message Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="email-body" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Email Message Content (HTML or Markdown supported)
            </label>
            <span className="text-[11px] font-mono text-slate-500">
              {body.length} / 5,000 characters
            </span>
          </div>
          <textarea
            id="email-body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
            placeholder="Write your email campaign announcement here... Linebreaks convert into paragraph blocks automatically."
            className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-white placeholder:text-slate-600 text-sm outline-none focus:border-indigo-500 transition-all font-mono leading-relaxed disabled:opacity-50"
          />
        </div>

        {/* Form Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              disabled={loading}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 cursor-pointer disabled:opacity-50"
            >
              👁 Live Preview
            </button>
            <button
              type="button"
              disabled={loading}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 cursor-pointer disabled:opacity-50"
            >
              💾 Save as Draft
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              disabled={loading}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              📅 Schedule Dispatch
            </button>
            <button
              type="button"
              onClick={sendBroadcast}
              disabled={loading}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Email</span> <span>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}