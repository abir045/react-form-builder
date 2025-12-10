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

interface FormFieldProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
  watchValues?: FieldValues;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  register,
  error,
  watchValues,
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

  // Render appropriate field type
  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "tel":
    case "number":
      return <TextInput field={field} register={register} error={error} />;

    case "textarea":
      return <TextareaInput field={field} register={register} error={error} />;

    case "select":
      return <SelectInput field={field} register={register} error={error} />;

    case "checkbox":
      return <CheckboxInput field={field} register={register} error={error} />;

    case "radio":
      return <RadioInput field={field} register={register} error={error} />;

    case "date":
      return <DateInput field={field} register={register} error={error} />;

    case "heading":
      return (
        <div key={field.name} className="col-span-full">
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            {field.label}
          </h3>
        </div>
      );

    // We'll add more field types later (textarea, radio, file, date)

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
