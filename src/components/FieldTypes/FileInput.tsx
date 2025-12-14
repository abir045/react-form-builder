// src/components/FieldTypes/FileInput.tsx

import React from "react";
import type { FieldConfig } from "../../types/formBuilder.types";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface FileInputProps {
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

export const FileInput: React.FC<FileInputProps> = ({
  field,
  register,
  error,
  classNames = {},
}) => {
  const [fileName, setFileName] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const wrapperClasses = `space-y-2 ${
    field.wrapperClassName || classNames.fieldWrapper || ""
  }`;

  const labelClasses = `block text-sm font-medium text-gray-700 ${
    field.labelClassName || classNames.label || ""
  }`;

  const errorClasses = `text-sm text-red-600 ${
    field.errorClassName || classNames.error || ""
  }`;

  const { ref, onChange, ...rest } = register(field.name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("");
    }
    onChange(e); // Call react-hook-form's onChange
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setFileName("");
      // Trigger onChange for react-hook-form
      const event = new Event("change", { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className={wrapperClasses}>
      <label htmlFor={field.name} className={labelClasses}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Hidden file input */}
      <input
        id={field.name}
        type="file"
        accept={field.accept}
        {...rest}
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        onChange={handleFileChange}
        className="hidden"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />

      {/* Custom buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleButtonClick}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            field.inputClassName || classNames.input || ""
          }`}
        >
          Choose File
        </button>

        {fileName && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-300">
            <span className="text-sm text-gray-700 truncate max-w-xs">
              {fileName}
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
              aria-label="Remove file"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {field.accept && (
        <small className="text-xs text-gray-500 block">
          Accepted formats: {field.accept}
        </small>
      )}
      {field.maxSize && (
        <small className="text-xs text-gray-500 block">
          Max size: {(field.maxSize / (1024 * 1024)).toFixed(1)}MB
        </small>
      )}
      {error && (
        <p id={`${field.name}-error`} className={errorClasses} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};
