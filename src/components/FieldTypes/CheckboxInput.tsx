import React from "react";
import clsx from "clsx";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CheckboxInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  field,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={field.name}
            type="checkbox"
            disabled={field.disabled}
            className={clsx(
              "w-4 h-4 rounded",
              "border-gray-300",
              "text-blue-600",
              "focus:ring-2 focus:ring-blue-500",
              "transition-colors duration-200",
              error && "border-red-500",
              field.disabled && "cursor-not-allowed opacity-60"
            )}
            {...register(field.name)}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={field.name}
            className={clsx(
              "font-medium text-gray-700",
              field.disabled && "opacity-60"
            )}
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.helperText && !error && (
            <p className="text-gray-500 mt-1">{field.helperText}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1 ml-7">
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
