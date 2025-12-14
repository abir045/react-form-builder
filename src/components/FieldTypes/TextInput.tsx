import React from "react";
import clsx from "clsx";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  classNames?: {
    fieldWrapper?: string;
    label?: string;
    input?: string;
    error?: string;
  };
}

export const TextInput: React.FC<TextInputProps> = ({
  field,
  register,
  error,
  classNames = {},
}) => {
  // Merge default classes with custom classes
  const wrapperClasses = `space-y-2 ${
    field.wrapperClassName || classNames.fieldWrapper || ""
  }`;

  const labelClasses = `block text-sm font-medium text-gray-700 ${
    field.labelClassName || classNames.label || ""
  }`;

  const baseInputStyles = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const errorBorderClass = error ? "border-red-500" : "border-gray-300";
  const inputClasses = `${baseInputStyles} ${errorBorderClass} ${
    field.inputClassName || classNames.input || ""
  }`;

  const errorClasses = `text-sm text-red-600 ${
    field.errorClassName || classNames.error || ""
  }`;
  return (
    <div className={wrapperClasses}>
      {field.label && (
        <label htmlFor={field.name} className={labelClasses}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={field.name}
        type={field.type}
        {...register(field.name)}
        placeholder={field.placeholder}
        className={inputClasses}
      />

      {error && <p className={errorClasses}>{error.message}</p>}
    </div>
    // <div className="mb-4">
    //   <label
    //     htmlFor={field.name}
    //     className="block text-sm font-medium text-gray-700 mb-1"
    //   >
    //     {field.label}
    //     {field.required && <span className="text-red-500 ml-1">*</span>}
    //   </label>

    //   <input
    //     id={field.name}
    //     type={field.type}
    //     placeholder={field.placeholder}
    //     disabled={field.disabled}
    //     className={clsx(
    //       "w-full px-3 py-2 border rounded-lg",
    //       "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    //       "transition-colors duration-200",
    //       error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
    //       field.disabled && "bg-gray-100 cursor-not-allowed opacity-60"
    //     )}
    //     {...register(field.name)}
    //   />

    //   {/* Helper text (shown when no error) */}
    //   {field.helperText && !error && (
    //     <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
    //   )}

    //   {/* Error message */}
    //   {error && (
    //     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
    //       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    //         <path
    //           fillRule="evenodd"
    //           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
    //           clipRule="evenodd"
    //         />
    //       </svg>
    //       {error.message}
    //     </p>
    //   )}
    // </div>
  );
};
