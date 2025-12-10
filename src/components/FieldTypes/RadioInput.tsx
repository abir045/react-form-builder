// src/components/FieldTypes/RadioInput.tsx

import React from "react";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface RadioInputProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  field,
  register,
  error,
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

  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </legend>

        <div className="space-y-2">
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${field.name}-${option.value}`}
                value={option.value}
                {...register(field.name, validationRules)}
                disabled={field.disabled}
                className={`
                  w-4 h-4 text-blue-600 border-gray-300
                  focus:ring-2 focus:ring-blue-500
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${error ? "border-red-500" : ""}
                `}
              />
              <label
                htmlFor={`${field.name}-${option.value}`}
                className={`
                  ml-2 text-sm text-gray-700 cursor-pointer
                  ${field.disabled ? "cursor-not-allowed opacity-50" : ""}
                `}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>

        {field.helperText && !error && (
          <p className="mt-2 text-xs text-gray-500">{field.helperText}</p>
        )}

        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </fieldset>
    </div>
  );
};
