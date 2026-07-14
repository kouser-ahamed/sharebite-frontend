import type { ReactElement } from "react";

interface PasswordChecklistProps {
  password?: string;
}

interface PasswordRule {
  key: string;
  label: string;
  test: (password: string) => boolean;
}

const rules: PasswordRule[] = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (password: string): boolean =>
      password.length >= 8,
  },
  {
    key: "uppercase",
    label: "One uppercase letter",
    test: (password: string): boolean =>
      /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "One lowercase letter",
    test: (password: string): boolean =>
      /[a-z]/.test(password),
  },
];

const PasswordChecklist = ({
  password = "",
}: PasswordChecklistProps): ReactElement => {
  return (
    <div className="mt-2 space-y-1 text-xs sm:text-sm">
      {rules.map((rule) => {
        const isValid = rule.test(password);

        return (
          <div
            key={rule.key}
            className={`flex items-center gap-2 font-medium transition-colors ${
              isValid
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-500 dark:text-zinc-500"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                isValid
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-500 dark:bg-zinc-800 dark:text-zinc-500"
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