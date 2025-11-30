// components/inputs.tsx
import React from "react";
import clsx from "clsx";

type BaseProps = {
  label: string;
  required?: boolean;
  className?: string;
};

type TextInputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: React.FC<TextInputProps> = ({
  label,
  required,
  className,
  ...rest
}) => (
  <label className={clsx("flex flex-col gap-1 text-sm", className)}>
    <span className="font-medium text-slate-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </span>
    <input
      className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      {...rest}
    />
  </label>
);

type TextAreaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  required,
  className,
  ...rest
}) => (
  <label className={clsx("flex flex-col gap-1 text-sm", className)}>
    <span className="font-medium text-slate-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </span>
    <textarea
      className="min-h-[96px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      {...rest}
    />
  </label>
);

type SelectInputProps = BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  required,
  className,
  children,
  ...rest
}) => (
  <label className={clsx("flex flex-col gap-1 text-sm", className)}>
    <span className="font-medium text-slate-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </span>
    <select
      className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-0 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      {...rest}
    >
      {children}
    </select>
  </label>
);

type PillCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const PillCheckbox: React.FC<PillCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={clsx(
      "px-4 py-2 rounded-full text-sm border transition",
      checked
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    )}
  >
    {label}
  </button>
);
