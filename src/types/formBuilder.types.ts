// src/types/formBuilder.types.ts
import type { ComponentType } from "react";
import type { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

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
  | "heading"
  | "url";

export interface BaseFieldComponentProps {
  field: FieldConfig;
  register: UseFormRegister<FieldValues>;
  error?: FieldError;
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

// Interface for the component library
export interface ComponentLibrary {
  TextInput?: ComponentType<BaseFieldComponentProps>;
  TextareaInput?: ComponentType<BaseFieldComponentProps>;
  SelectInput?: ComponentType<BaseFieldComponentProps>;
  CheckboxInput?: ComponentType<BaseFieldComponentProps>;
  RadioInput?: ComponentType<BaseFieldComponentProps>;
  DateInput?: ComponentType<BaseFieldComponentProps>;
}

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
  label?: string;
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

  // Add field-level styling
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  wrapperClassName?: string;
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
}

export interface FormConfig {
  formId?: string;
  title?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  description?: string;
  multiStep?: boolean;
  resetOnSuccess?: boolean;
  steps?: StepConfig[];
  fields?: FieldConfig[];
  submitButton?: {
    text?: string;
    loadingText?: string;
    className?: string;
  };
}

export interface FormClassNames {
  container?: string;
  form?: string;
  title?: string;
  description?: string;
  fieldWrapper?: string;
  label?: string;
  input?: string;
  textarea?: string;
  select?: string;
  checkbox?: string;
  radio?: string;
  error?: string;
  button?: string;
  buttonDisabled?: string;
}

// Generic type for form data - can be customized per form
export type FormData = Record<string, unknown>;

export interface FormBuilderProps {
  config: FormConfig;
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  onSuccess?: (data: Record<string, unknown>) => void | Promise<void>;
  onError?: (error: Error) => void;
  className?: string;
  classNames?: FormClassNames;
  components?: ComponentLibrary;
}
