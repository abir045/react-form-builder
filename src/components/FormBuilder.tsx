// src/components/FormBuilder.tsx
"use no memo";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createFormSchema } from "../validators";
import { FormField } from "./FormField";
import { Loader2 } from "lucide-react";
import type { FormBuilderProps } from "../types/formBuilder.types";

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  onSuccess,
  // onError,
  className = "",
  classNames = {},
}) => {
  // Get fields from config (support both single and multi-step forms)
  const fields = config.multiStep ? [] : config.fields || [];

  // Create Zod validation schema from field configs
  const schema = createFormSchema(fields);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(fields),
  });

  // Watch all form values for conditional logic
  const watchValues = watch();

  // Handle form submission
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }

      if (onSuccess) {
        await onSuccess(data);
      }

      if (config.resetOnSuccess !== false) {
        reset();
      }

      console.log(data);

      // Access the file from FileList
    } catch (error) {
      // if(onError) onError(error as Error )
      console.error("Form submission error:", error);

      throw error;
    }
  };

  // Merge default classes with custom classes
  const containerClasses = `max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md ${
    classNames.container || ""
  } ${className}`;

  const formClasses = `space-y-4 ${classNames.form || ""}`;

  const titleClasses = `text-2xl font-bold text-gray-900 mb-2 ${
    config.titleClassName || classNames?.title || ""
  }`;

  const descriptionClasses = `text-gray-600 mb-6 ${
    config.descriptionClassName || classNames?.description || ""
  }`;

  const buttonClasses = `w-full bg-blue-600 text-white py-3 px-4 rounded-lg 
    hover:bg-blue-700 transition-colors duration-200 font-medium text-sm
    flex items-center justify-center gap-2
    ${classNames.button || ""} ${config.submitButton?.className || ""}`;

  const buttonDisabledClasses = `disabled:bg-gray-400 disabled:cursor-not-allowed
    ${classNames.buttonDisabled || ""}`;

  return (
    <div className={containerClasses}>
      {/* Form Header */}
      {config.title && <h2 className={titleClasses}>{config.title}</h2>}

      {config.description && (
        <p className={descriptionClasses}>{config.description}</p>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className={formClasses}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            error={errors[field.name] as any}
            watchValues={watchValues}
            classNames={classNames}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${buttonClasses} ${
            isSubmitting ? buttonDisabledClasses : ""
          }`}
        >
          {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
          {isSubmitting
            ? config.submitButton?.loadingText || "Submitting..."
            : config.submitButton?.text || "Submit"}
        </button>
      </form>
    </div>
  );
};

// Helper function to extract default values from field configs
function getDefaultValues(
  fields: {
    name: string;
    defaultValue?: string | number | boolean | Date | null;
  }[]
) {
  const defaults: Record<string, unknown> = {};

  fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    }
  });

  return defaults;
}
