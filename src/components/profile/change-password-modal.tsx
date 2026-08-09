"use client";

import { useState, FormEvent } from "react";
import { Lock, X, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function ChangePasswordModal() {
  // Modal & Visibility States
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation & Response States
  const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setConfirmPasswordError(null);
    setModalError(null);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    resetForm();
  };

  // Inline Validation Helpers
  const validateCurrentPassword = (val: string): boolean => {
    if (!val) {
      setCurrentPasswordError("Current password is required.");
      return false;
    }
    setCurrentPasswordError(null);
    return true;
  };

  const validateNewPassword = (val: string, currVal: string): boolean => {
    if (!val) {
      setNewPasswordError("New password is required.");
      return false;
    }
    if (val.length < 8) {
      setNewPasswordError("New password must be at least 8 characters long.");
      return false;
    }
    if (currVal && val === currVal) {
      setNewPasswordError("New password must be different from current password.");
      return false;
    }
    setNewPasswordError(null);
    return true;
  };

  const validateConfirmPassword = (val: string, newPassVal: string): boolean => {
    if (!val) {
      setConfirmPasswordError("Please confirm your new password.");
      return false;
    }
    if (val !== newPassVal) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }
    setConfirmPasswordError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalError(null);

    const isCurrentValid = validateCurrentPassword(currentPassword);
    const isNewValid = validateNewPassword(newPassword, currentPassword);
    const isConfirmValid = validateConfirmPassword(confirmPassword, newPassword);

    if (!isCurrentValid || !isNewValid || !isConfirmValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/profile/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setModalError(data.message || "Failed to change password. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Success Flow
      setIsSubmitting(false);
      setIsOpen(false);
      resetForm();

      // Show Toast Notification
      setToastMessage("Password changed successfully.");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    } catch {
      setModalError("An unexpected network error occurred. Please try again.");
      setIsSubmitting(false);
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

      {/* Change Password Card Trigger */}
      <div className="w-full sm:w-auto flex-1 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200 block">
              Change Password
            </span>
            <span className="text-[10px] text-slate-400 block">
              Update your account password
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Change Password
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  Change Password
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Alert Box */}
            {modalError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Current Password */}
              <div>
                <label
                  htmlFor="modal-current-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="modal-current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    required
                    placeholder="Enter current password"
                    className={`w-full px-4 py-3 pr-11 rounded-xl bg-slate-950 text-white border text-sm outline-none transition-all ${
                      currentPasswordError
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (currentPasswordError) validateCurrentPassword(e.target.value);
                    }}
                    onBlur={(e) => validateCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {currentPasswordError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {currentPasswordError}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="modal-new-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="modal-new-password"
                    type={showNewPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    required
                    placeholder="At least 8 characters"
                    className={`w-full px-4 py-3 pr-11 rounded-xl bg-slate-950 text-white border text-sm outline-none transition-all ${
                      newPasswordError
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (newPasswordError) validateNewPassword(e.target.value, currentPassword);
                      if (confirmPassword && confirmPasswordError) {
                        validateConfirmPassword(confirmPassword, e.target.value);
                      }
                    }}
                    onBlur={(e) => validateNewPassword(e.target.value, currentPassword)}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {newPasswordError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {newPasswordError}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label
                  htmlFor="modal-confirm-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="modal-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    required
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 pr-11 rounded-xl bg-slate-950 text-white border text-sm outline-none transition-all ${
                      confirmPasswordError
                        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) validateConfirmPassword(e.target.value, newPassword);
                    }}
                    onBlur={(e) => validateConfirmPassword(e.target.value, newPassword)}
                  />
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 focus:outline-none p-1 rounded-md transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
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
                      <span>Changing Password...</span>
                    </>
                  ) : (
                    <span>Change Password</span>
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