// src/components/FieldTypes/DateInput.tsx

import React from "react";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface DateInputProps {
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

export const DateInput: React.FC<DateInputProps> = ({
  field,
  register,
  error,
  classNames = {},
}) => {
  const validationRules: Record<string, unknown> = {
    required: field.required ? `${field.label} is required` : false,
  };

  // Add validation rules if present
  if (field.validation) {
    // Min date validation
    if (field.validation.min) {
      validationRules.min = {
        value: field.validation.min,
        message:
          field.validation.message ||
          `Date must be after ${field.validation.min}`,
      };
    }

    // Max date validation
    if (field.validation.max) {
      validationRules.max = {
        value: field.validation.max,
        message:
          field.validation.message ||
          `Date must be before ${field.validation.max}`,
      };
    }

    // Custom pattern validation (if needed)
    if (field.validation.pattern) {
      validationRules.pattern = {
        value:
          typeof field.validation.pattern === "string"
            ? new RegExp(field.validation.pattern)
            : field.validation.pattern,
        message: field.validation.message || "Invalid date format",
      };
    }
  }

  // Format default value if it's a Date object
  let defaultValue = field.defaultValue;
  if (defaultValue instanceof Date) {
    defaultValue = defaultValue.toISOString().split("T")[0];
  }

  const wrapperClasses = `space-y-2 ${
    field.wrapperClassName || classNames.fieldWrapper || ""
  }`;

  const labelClasses = `block text-sm font-medium text-gray-700 ${
    field.labelClassName || classNames.label || ""
  }`;

  const baseDateStyles = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`;
  const errorBorderClass = error ? "border-red-500" : "border-gray-300";
  const dateClasses = `${baseDateStyles} ${errorBorderClass} ${
    field.inputClassName || classNames.input || ""
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

      <input
        type="date"
        id={field.name}
        {...register(field.name, validationRules)}
        placeholder={field.placeholder}
        defaultValue={defaultValue as string}
        disabled={field.disabled}
        className={dateClasses}
      />

      {field.helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{field.helperText}</p>
      )}

      {error && <p className={errorClasses}>{error.message}</p>}
    </div>
  );
};
