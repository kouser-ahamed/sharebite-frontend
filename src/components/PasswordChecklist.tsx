import React from "react";

const rules = [
  {
    key: "length",
    label: "At least 6 characters",
    test: (password) => password.length >= 6,
  },
  {
    key: "uppercase",
    label: "One uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "One lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
];

const PasswordChecklist = ({ password = "" }) => {
  return (
    <div className="mt-2 space-y-1 text-xs sm:text-sm">
      {rules.map((rule) => {
        const isValid = rule.test(password);

        return (
          <div
            key={rule.key}
            className={`flex items-center gap-2 font-medium transition-colors ${
              isValid ? "text-emerald-600" : "text-slate-500"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                isValid
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {isValid ? "✓" : "•"}
            </span>
            <span>{rule.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordChecklist;