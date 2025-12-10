// src/components/FieldTypes/TextareaInput.tsx

import React from "react";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface TextareaInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  field,
  register,
  error,
}) => {
  const validationRules: Record<string, unknown> = {
    required: field.required ? `${field.label} is required` : false,
  };

  // Add validation rules if present
  if (field.validation) {
    if (field.validation.minLength) {
      validationRules.minLength = {
        value: field.validation.minLength,
        message:
          field.validation.message ||
          `Minimum ${field.validation.minLength} characters required`,
      };
    }

    if (field.validation.maxLength) {
      validationRules.maxLength = {
        value: field.validation.maxLength,
        message:
          field.validation.message ||
          `Maximum ${field.validation.maxLength} characters allowed`,
      };
    }

    if (field.validation.pattern) {
      validationRules.pattern = {
        value:
          typeof field.validation.pattern === "string"
            ? new RegExp(field.validation.pattern)
            : field.validation.pattern,
        message: field.validation.message || "Invalid format",
      };
    }
  }

  return (
    <div className="mb-4">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={field.name}
        {...register(field.name, validationRules)}
        placeholder={field.placeholder}
        disabled={field.disabled}
        rows={field.rows || 4}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />

      {field.helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{field.helperText}</p>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
