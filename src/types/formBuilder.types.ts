// src/types/formBuilder.types.ts

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "file"
  | "heading";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string | RegExp;
  message?: string;
}

export interface ConditionalLogic {
  show?: {
    when: string; // field name to watch
    equals?: string | number | boolean; // show if field equals this value
    notEquals?: string | number | boolean; // show if field does not equal this value
  };
}

export interface Option {
  value: string | number;
  label: string;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: string | number | boolean | Date | null;
  required?: boolean;
  validation?: ValidationRule;
  conditionalLogic?: ConditionalLogic;
  options?: Option[]; // for select, radio
  accept?: string; // for file input (e.g., ".pdf,.doc")
  maxSize?: number; // for file input (bytes)
  rows?: number; // for textarea
  disabled?: boolean;
  helperText?: string; // hint text below field
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
}

export interface FormConfig {
  formId: string;
  title?: string;
  description?: string;
  multiStep?: boolean;
  steps?: StepConfig[];
  fields?: FieldConfig[];
  submitButton?: {
    text?: string;
    loadingText?: string;
  };
  autoSave?: boolean;
  autoSaveDelay?: number; // milliseconds
}

// Generic type for form data - can be customized per form
export type FormData = Record<string, unknown>;

export interface FormBuilderProps {
  config: FormConfig;
  onSubmit: (data: FormData) => void | Promise<void>;
  onError?: (errors: Record<string, unknown>) => void;
  className?: string;
}
