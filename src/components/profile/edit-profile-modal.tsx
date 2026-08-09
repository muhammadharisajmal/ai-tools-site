"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Edit3, X, CheckCircle2, AlertCircle } from "lucide-react";

interface EditProfileModalProps {
  initialName: string;
}

export default function EditProfileModal({ initialName }: EditProfileModalProps) {
  const router = useRouter();

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(initialName);
  const [editName, setEditName] = useState(initialName);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  // Validate Name Input
  const validateName = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setNameError("Full name cannot be empty.");
      return false;
    }
    if (trimmed.length < 2) {
      setNameError("Name must be at least 2 characters long.");
      return false;
    }
    if (trimmed.length > 50) {
      setNameError("Name cannot exceed 50 characters.");
      return false;
    }
    setNameError(null);
    return true;
  };

  const handleOpenModal = () => {
    setEditName(userName);
    setNameError(null);
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSaving) return;
    setIsModalOpen(false);
    setNameError(null);
    setModalError(null);
  };

  const handleSaveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalError(null);

    const isValid = validateName(editName);
    if (!isValid) return;

    setIsSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editName.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setModalError(
          data.message || "Failed to update profile. Please try again."
        );
        setIsSaving(false);
        return;
      }

      // Success Workflow
      const updatedName = editName.trim();
      setUserName(updatedName);

      setIsSaving(false);
      setIsModalOpen(false);

      // Revalidate Server Components to sync session & database across the page
      router.refresh();

      // Show Success Toast
      setToastMessage("Profile updated successfully.");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch {
      setModalError("An unexpected error occurred. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-3 backdrop-blur-2xl shadow-2xl animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Edit Profile Action Trigger Card */}
      <div className="w-full sm:w-auto flex-1 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200 block">
              Edit Profile
            </span>
            <span className="text-[10px] text-slate-400 block">
              Modify display name
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* Centered Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  Edit Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSaving}
                className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Alert */}
            {modalError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveChanges} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  disabled={isSaving}
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 text-white border text-sm outline-none transition-all ${
                    nameError
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    if (nameError) validateName(e.target.value);
                  }}
                  onBlur={(e) => validateName(e.target.value)}
                />
                {nameError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}