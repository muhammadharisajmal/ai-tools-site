"use client";

import { useState } from "react";

interface NotificationSwitchProps {
  id: string;
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export default function NotificationSwitch({
  id,
  title,
  description,
  defaultChecked = true,
}: NotificationSwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 transition-colors">
      <div className="space-y-0.5 pr-4">
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-200 block cursor-pointer select-none"
        >
          {title}
        </label>
        <p className="text-[11px] text-slate-400 leading-relaxed select-none">
          {description}
        </p>
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={async () => {
            const newValue = !enabled;
          
            setEnabled(newValue);
          
            try {
              await fetch("/api/settings/notifications", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  key: id,
                  value: newValue,
                }),
              });
            } catch {
              // rollback if request fails
              setEnabled(!newValue);
            }
          }}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
          enabled ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500" : "bg-slate-800"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}