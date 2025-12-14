// src/components/FieldTypes/RadioInput.tsx

import React from "react";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface RadioInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  classNames?: {
    fieldWrapper?: string;
    label?: string;
    radio?: string;
    error?: string;
  };
}

export const RadioInput: React.FC<RadioInputProps> = ({
  field,
  register,
  error,
  classNames = {},
}) => {
  const validationRules: Record<string, unknown> = {
    required: field.required ? `${field.label} is required` : false,
  };

  // Add custom validation rules if present
  if (field.validation) {
    if (field.validation.pattern) {
      validationRules.pattern = {
        value:
          typeof field.validation.pattern === "string"
            ? new RegExp(field.validation.pattern)
            : field.validation.pattern,
        message: field.validation.message || "Invalid selection",
      };
    }
  }
  const wrapperClasses = `space-y-2 ${
    field.wrapperClassName || classNames.fieldWrapper || ""
  }`;

  const labelClasses = `block text-sm font-medium text-gray-700 ${
    field.labelClassName || classNames.label || ""
  }`;

  const radioClasses = `h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
    field.inputClassName || classNames.radio || ""
  }`;

  const errorClasses = `text-sm text-red-600 ${
    field.errorClassName || classNames.error || ""
  }`;

  return (
    <div className={wrapperClasses}>
      {field.label && (
        <label className={labelClasses}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex flex-col gap-2">
        {field.options?.map((option) => (
          <div key={option.value} className="flex items-center  gap-2">
            <input
              type="radio"
              id={`${field.name}-${option.value}`}
              value={option.value}
              {...register(field.name, validationRules)}
              disabled={field.disabled}
              className={radioClasses}
            />
            <label
              htmlFor={`${field.name}-${option.value}`}
              className={labelClasses}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {field.helperText && !error && (
        <p className="mt-2 text-xs text-gray-500">{field.helperText}</p>
      )}

      {error && <p className={errorClasses}>{error.message}</p>}
    </div>
  );
};
