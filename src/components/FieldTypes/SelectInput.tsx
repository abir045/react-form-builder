import React from "react";

import clsx from "clsx";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  classNames?: {
    fieldWrapper?: string;
    label?: string;
    select?: string;
    error?: string;
  };
}

export const SelectInput: React.FC<SelectInputProps> = ({
  field,
  register,
  error,
  classNames = {},
}) => {
  const wrapperClasses = `space-y-2 ${
    field.wrapperClassName || classNames.fieldWrapper || ""
  }`;

  const labelClasses = `block text-sm font-medium text-gray-700 ${
    field.labelClassName || classNames.label || ""
  }`;

  const baseSelectStyles = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const errorBorderClass = error ? "border-red-500" : "border-gray-300";
  const selectClasses = `${baseSelectStyles} ${errorBorderClass} ${
    field.inputClassName || classNames.select || ""
  }`;

  const errorClasses = `text-sm text-red-600 ${
    field.errorClassName || classNames.error || ""
  }`;

  return (
    <div className={wrapperClasses}>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        id={field.name}
        disabled={field.disabled}
        className={selectClasses}
        {...register(field.name)}
      >
        <option value="">
          {" "}
          {field.placeholder || `Select ${field.label}`}
        </option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {field.helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>
      )}

      {error && (
        <p className={errorClasses}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};
