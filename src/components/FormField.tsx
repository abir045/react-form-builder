// src/components/FormField.tsx

import React from "react";
// import { UseFormRegister, FieldError, FieldValues } from 'react-hook-form';
// import { FieldConfig } from '../types/formBuilder.types';
import { TextInput } from "./FieldTypes/TextInput";
import { SelectInput } from "./FieldTypes/SelectInput";
import { CheckboxInput } from "./FieldTypes/CheckboxInput";
import type { FieldConfig } from "../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { TextareaInput } from "./FieldTypes/TextareaInput";
import { RadioInput } from "./FieldTypes/RadioInput";
import { DateInput } from "./FieldTypes/DateInput";
import { FileInput } from "./FieldTypes/FileInput";

interface FormFieldProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  watchValues?: FieldValues;
  classNames?: {
    fieldWrapper?: string;
    label?: string;
    input?: string;
    textarea?: string;
    select?: string;
    checkbox?: string;
    radio?: string;
    error?: string;
  };
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  register,
  error,
  watchValues,
  classNames = {},
}) => {
  // Handle conditional logic - hide field if conditions not met
  if (field.conditionalLogic?.show) {
    const { when, equals, notEquals } = field.conditionalLogic.show;
    const watchValue = watchValues?.[when];

    // Show field only if equals condition is met
    if (equals !== undefined && watchValue !== equals) {
      return null;
    }

    // Show field only if notEquals condition is met
    if (notEquals !== undefined && watchValue === notEquals) {
      return null;
    }
  }

  // Merge default classes with custom classes
  // const wrapperClasses = `space-y-2 ${
  //   field.wrapperClassName || classNames.fieldWrapper || ""
  // }`;

  // const labelClasses = `block text-sm font-medium text-gray-700 ${
  //   field.labelClassName || classNames.label || ""
  // }`;

  // const inputClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  //   ${error ? "border-red-500" : "border-gray-300"}
  //   ${field.inputClassName || classNames.input || ""}`;

  // const textareaClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  //   ${error ? "border-red-500" : "border-gray-300"}
  //   ${field.inputClassName || classNames.textarea || ""}`;

  // const selectClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  //   ${error ? "border-red-500" : "border-gray-300"}
  //   ${field.inputClassName || classNames.select || ""}`;

  // const errorClasses = `text-sm text-red-600 ${
  //   field.errorClassName || classNames.error || ""
  // }`;

  //Render appropriate field type
  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "tel":
    case "number":
    case "url":
      return (
        <TextInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "textarea":
      return (
        <TextareaInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "select":
      return (
        <SelectInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "checkbox":
      return (
        <CheckboxInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "radio":
      return (
        <RadioInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "date":
      return (
        <DateInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "file":
      return (
        <FileInput
          field={field}
          register={register}
          error={error}
          classNames={classNames}
        />
      );

    case "heading": {
      const headingClasses = `text-lg font-semibold text-gray-900 mt-6 mb-3 ${
        field.inputClassName || classNames.label || ""
      }`;

      return (
        <div
          key={field.name}
          className={`col-span-full ${
            field.wrapperClassName || classNames.fieldWrapper || ""
          }`}
        >
          <h3 className={headingClasses}>{field.label}</h3>
        </div>
      );
    }

    default:
      return (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Unsupported field type: <strong>{field.type}</strong>
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Field name: {field.name}
          </p>
        </div>
      );
  }
};
