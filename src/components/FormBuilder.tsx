// src/components/FormBuilder.tsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createFormSchema } from "../validators";
import { FormField } from "./FormField";
import { Loader2 } from "lucide-react";
import type { FormBuilderProps } from "../types/formBuilder.types";

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  onError,
  className = "",
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

  // Auto-save functionality
  useEffect(() => {
    if (config.autoSave) {
      const delay = config.autoSaveDelay || 1000;
      const timer = setTimeout(() => {
        const draftKey = `form-draft-${config.formId}`;
        localStorage.setItem(draftKey, JSON.stringify(watchValues));
        console.log("💾 Draft auto-saved");
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [watchValues, config.autoSave, config.autoSaveDelay, config.formId]);

  // Load saved draft on mount
  useEffect(() => {
    if (config.autoSave) {
      const draftKey = `form-draft-${config.formId}`;
      const savedDraft = localStorage.getItem(draftKey);

      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          reset(parsedDraft);
          console.log("📂 Draft loaded from storage");
        } catch (error) {
          console.error("Failed to load draft:", error);
        }
      }
    }
  }, [config.autoSave, config.formId, reset]);

  // Handle form submission
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      await onSubmit(data);

      // Clear draft after successful submission
      if (config.autoSave) {
        const draftKey = `form-draft-${config.formId}`;
        localStorage.removeItem(draftKey);
        console.log("🗑️ Draft cleared after submission");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      onError?.(error as Record<string, unknown>);
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ${className}`}
    >
      {/* Form Header */}
      {config.title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {config.title}
        </h2>
      )}

      {config.description && (
        <p className="text-gray-600 mb-6">{config.description}</p>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            error={errors[field.name]}
            watchValues={watchValues}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg 
                     hover:bg-blue-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed 
                     flex items-center justify-center gap-2
                     transition-colors duration-200
                     font-medium text-sm"
        >
          {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
          {isSubmitting
            ? config.submitButton?.loadingText || "Submitting..."
            : config.submitButton?.text || "Submit"}
        </button>
      </form>

      {/* Auto-save indicator */}
      {config.autoSave && (
        <p className="text-xs text-gray-500 mt-4 text-center">
          💾 Changes are automatically saved
        </p>
      )}
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
