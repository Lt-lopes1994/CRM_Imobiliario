import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function Input({
  label,
  error,
  required,
  className = "",
  ...props
}: InputProps) {
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600 bg-white";
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-bold text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-700 font-semibold">{error}</p>}
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export function TextArea({
  label,
  error,
  required,
  className = "",
  ...props
}: TextAreaProps) {
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-600 bg-white resize-vertical";
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-bold text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-700 font-semibold">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  required,
  options,
  className = "",
  ...props
}: SelectProps) {
  const baseClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white";
  const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-bold text-gray-900">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <select
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      >
        <option value="" className="text-gray-800">
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-900"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-700 font-semibold">{error}</p>}
    </div>
  );
}
