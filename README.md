# React Form Builder - Comprehensive Usage Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [JSON Configuration Structure](#json-configuration-structure)
5. [Field Types Reference](#field-types-reference)
6. [Validation Rules](#validation-rules)
7. [Advanced Features](#advanced-features)
8. [Styling & Customization](#styling--customization)
9. [Complete Examples](#complete-examples)
10. [File Upload Handling](#file-upload-handling)

---

## Overview

React Form Builder is a dynamic form generation library that creates fully validated forms from JSON configurations. Built with React, TypeScript, React Hook Form, and Zod for type-safe validation.

### Key Features

- ✅ JSON-driven form generation
- ✅ Built-in validation with Zod
- ✅ 12+ field types supported
- ✅ Conditional field logic
- ✅ File upload support
- ✅ Fully customizable styling
- ✅ TypeScript support
- ✅ Accessible (ARIA labels)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/abir045/react-form-builder.git
cd react-form-builder

# Install dependencies
npm install

# Run development server
npm run dev
```

### Required Dependencies

```json
{
  "react": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "zod": "^3.24.1",
  "@hookform/resolvers": "^3.9.1"
}
```

---

## Quick Start

### Basic Usage

```tsx
import { FormBuilder } from "./components/FormBuilder";
import type { FormConfig } from "./types/formBuilder.types";

function App() {
  const formConfig: FormConfig = {
    title: "Contact Form",
    description: "Please fill out the form below",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        rows: 5,
      },
    ],
  };

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return <FormBuilder config={formConfig} onSubmit={handleSubmit} />;
}
```

---

## JSON Configuration Structure

### Root Configuration Object

```typescript
interface FormConfig {
  title: string; // Form title
  description?: string; // Optional description
  fields: FieldConfig[]; // Array of field configurations
}
```

### Field Configuration Object

```typescript
interface FieldConfig {
  // Required properties
  name: string; // Unique field identifier
  label: string; // Field label text
  type: FieldType; // Field type (see below)

  // Optional properties
  placeholder?: string; // Placeholder text
  required?: boolean; // Is field required

  // Validation
  validation?: {
    minLength?: number; // Min characters (text fields)
    maxLength?: number; // Max characters (text fields)
    min?: number; // Min value (number fields)
    max?: number; // Max value (number fields)
    pattern?: string; // Regex pattern
    message?: string; // Custom error message
  };

  // Field-specific
  options?: Array<{
    // For select/radio
    label: string;
    value: string;
  }>;
  rows?: number; // For textarea
  accept?: string; // For file (.pdf,.doc)
  maxSize?: number; // For file (bytes)

  // Conditional logic
  conditionalLogic?: {
    show?: {
      when: string; // Field name to watch
      equals?: any; // Show if equals value
      notEquals?: any; // Show if not equals
    };
  };

  // Custom styling
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}
```

---

## Field Types Reference

### Supported Field Types

```typescript
type FieldType =
  | "text" // Single-line text input
  | "email" // Email input with validation
  | "password" // Password input (hidden)
  | "number" // Numeric input
  | "tel" // Phone number input
  | "url" // URL input with validation
  | "date" // Date picker
  | "textarea" // Multi-line text
  | "select" // Dropdown selection
  | "radio" // Radio button group
  | "checkbox" // Single checkbox
  | "file" // File upload
  | "heading"; // Section heading (non-input)
```

### Field Type Examples

#### Text Input

```json
{
  "name": "fullName",
  "label": "Full Name",
  "type": "text",
  "required": true,
  "placeholder": "John Doe",
  "validation": {
    "minLength": 2,
    "maxLength": 50,
    "message": "Name must be between 2 and 50 characters"
  }
}
```

#### Email Input

```json
{
  "name": "email",
  "label": "Email Address",
  "type": "email",
  "required": true,
  "placeholder": "example@email.com"
}
```

#### Password Input

```json
{
  "name": "password",
  "label": "Password",
  "type": "password",
  "required": true,
  "validation": {
    "minLength": 8,
    "message": "Password must be at least 8 characters"
  }
}
```

#### Number Input

```json
{
  "name": "age",
  "label": "Age",
  "type": "number",
  "required": true,
  "validation": {
    "min": 18,
    "max": 120,
    "message": "Age must be between 18 and 120"
  }
}
```

#### Phone Number

```json
{
  "name": "phone",
  "label": "Phone Number",
  "type": "tel",
  "required": true,
  "placeholder": "+1234567890"
}
```

#### URL Input

```json
{
  "name": "website",
  "label": "Website",
  "type": "url",
  "placeholder": "https://example.com"
}
```

#### Date Input

```json
{
  "name": "birthDate",
  "label": "Date of Birth",
  "type": "date",
  "required": true
}
```

#### Textarea

```json
{
  "name": "bio",
  "label": "Biography",
  "type": "textarea",
  "rows": 5,
  "placeholder": "Tell us about yourself",
  "validation": {
    "maxLength": 500
  }
}
```

#### Select Dropdown

```json
{
  "name": "country",
  "label": "Country",
  "type": "select",
  "required": true,
  "options": [
    { "label": "United States", "value": "us" },
    { "label": "United Kingdom", "value": "uk" },
    { "label": "Canada", "value": "ca" }
  ]
}
```

#### Radio Buttons

```json
{
  "name": "gender",
  "label": "Gender",
  "type": "radio",
  "required": true,
  "options": [
    { "label": "Male", "value": "male" },
    { "label": "Female", "value": "female" },
    { "label": "Other", "value": "other" }
  ]
}
```

#### Checkbox

```json
{
  "name": "terms",
  "label": "I agree to the terms and conditions",
  "type": "checkbox",
  "required": true,
  "validation": {
    "message": "You must agree to continue"
  }
}
```

#### File Upload

```json
{
  "name": "resume",
  "label": "Upload Resume",
  "type": "file",
  "required": true,
  "accept": ".pdf,.doc,.docx",
  "maxSize": 5242880,
  "validation": {
    "message": "Please upload a valid resume (PDF or Word, max 5MB)"
  }
}
```

#### Heading (Section Divider)

```json
{
  "name": "personalInfo",
  "label": "Personal Information",
  "type": "heading"
}
```

---

## Validation Rules

### Built-in Validation

The form builder automatically validates based on field type:

- **Email**: Valid email format
- **URL**: Valid URL format
- **Tel**: Phone number format (digits only, 6-15 characters)
- **Number**: Numeric values only
- **Date**: Valid date format

### Custom Validation Rules

```json
{
  "name": "username",
  "type": "text",
  "validation": {
    "minLength": 3,
    "maxLength": 20,
    "pattern": "^[a-zA-Z0-9_]+$",
    "message": "Username must be 3-20 characters, alphanumeric and underscores only"
  }
}
```

### Validation Properties

| Property    | Field Types                               | Description          | Example           |
| ----------- | ----------------------------------------- | -------------------- | ----------------- |
| `minLength` | text, email, password, textarea, tel, url | Minimum characters   | `3`               |
| `maxLength` | text, email, password, textarea, tel, url | Maximum characters   | `50`              |
| `min`       | number, date                              | Minimum value/date   | `18`              |
| `max`       | number, date                              | Maximum value/date   | `120`             |
| `pattern`   | text, email, password, tel, url           | Regex pattern        | `"^[A-Z].*"`      |
| `message`   | all                                       | Custom error message | `"Invalid input"` |

---

## Advanced Features

### Conditional Field Logic

Show/hide fields based on other field values:

```json
{
  "fields": [
    {
      "name": "hasExperience",
      "label": "Do you have work experience?",
      "type": "radio",
      "options": [
        { "label": "Yes", "value": "yes" },
        { "label": "No", "value": "no" }
      ]
    },
    {
      "name": "yearsExperience",
      "label": "Years of Experience",
      "type": "number",
      "conditionalLogic": {
        "show": {
          "when": "hasExperience",
          "equals": "yes"
        }
      }
    }
  ]
}
```

#### Conditional Logic Options

```typescript
conditionalLogic: {
  show: {
    when: "fieldName",      // Field to watch
    equals: "value"         // Show if equals this value
    // OR
    notEquals: "value"      // Show if NOT equals this value
  }
}
```

### Multiple Conditions Example

```json
{
  "name": "otherCountry",
  "label": "Please specify",
  "type": "text",
  "conditionalLogic": {
    "show": {
      "when": "country",
      "equals": "other"
    }
  }
}
```

---

## Styling & Customization

### Using Custom CSS Classes

```json
{
  "name": "email",
  "label": "Email",
  "type": "email",
  "wrapperClassName": "my-field-wrapper",
  "labelClassName": "my-label",
  "inputClassName": "my-input",
  "errorClassName": "my-error"
}
```

### Global ClassNames via Props

```tsx
<FormBuilder
  config={formConfig}
  onSubmit={handleSubmit}
  classNames={{
    fieldWrapper: "mb-6",
    label: "font-semibold text-gray-800",
    input: "custom-input-class",
    error: "text-red-600 text-sm",
  }}
/>
```

### Tailwind CSS Example

```json
{
  "name": "email",
  "type": "email",
  "inputClassName": "rounded-lg border-2 border-blue-300 focus:border-blue-500 px-4 py-3"
}
```

### Bootstrap Example

```json
{
  "name": "email",
  "type": "email",
  "inputClassName": "form-control",
  "wrapperClassName": "mb-3"
}
```

---

## Complete Examples

### Example 1: Contact Form

```json
{
  "title": "Contact Us",
  "description": "We'd love to hear from you!",
  "fields": [
    {
      "name": "name",
      "label": "Your Name",
      "type": "text",
      "required": true,
      "placeholder": "John Doe"
    },
    {
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "required": true,
      "placeholder": "john@example.com"
    },
    {
      "name": "subject",
      "label": "Subject",
      "type": "select",
      "required": true,
      "options": [
        { "label": "General Inquiry", "value": "general" },
        { "label": "Support", "value": "support" },
        { "label": "Feedback", "value": "feedback" }
      ]
    },
    {
      "name": "message",
      "label": "Message",
      "type": "textarea",
      "required": true,
      "rows": 6,
      "validation": {
        "minLength": 10,
        "maxLength": 1000
      }
    }
  ]
}
```

### Example 2: Job Application Form

```json
{
  "title": "Job Application",
  "description": "Apply for a position at our company",
  "fields": [
    {
      "name": "personalInfo",
      "label": "Personal Information",
      "type": "heading"
    },
    {
      "name": "fullName",
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    },
    {
      "name": "phone",
      "label": "Phone Number",
      "type": "tel",
      "required": true
    },
    {
      "name": "experienceInfo",
      "label": "Experience",
      "type": "heading"
    },
    {
      "name": "hasExperience",
      "label": "Do you have relevant experience?",
      "type": "radio",
      "required": true,
      "options": [
        { "label": "Yes", "value": "yes" },
        { "label": "No", "value": "no" }
      ]
    },
    {
      "name": "years",
      "label": "Years of Experience",
      "type": "number",
      "conditionalLogic": {
        "show": {
          "when": "hasExperience",
          "equals": "yes"
        }
      },
      "validation": {
        "min": 0,
        "max": 50
      }
    },
    {
      "name": "resume",
      "label": "Upload Resume",
      "type": "file",
      "required": true,
      "accept": ".pdf,.doc,.docx",
      "maxSize": 5242880
    },
    {
      "name": "coverLetter",
      "label": "Cover Letter",
      "type": "textarea",
      "rows": 8,
      "validation": {
        "minLength": 50
      }
    }
  ]
}
```

### Example 3: User Registration

```json
{
  "title": "Create Account",
  "fields": [
    {
      "name": "username",
      "label": "Username",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 3,
        "maxLength": 20,
        "pattern": "^[a-zA-Z0-9_]+$",
        "message": "Username must be 3-20 characters, alphanumeric only"
      }
    },
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    },
    {
      "name": "password",
      "label": "Password",
      "type": "password",
      "required": true,
      "validation": {
        "minLength": 8,
        "message": "Password must be at least 8 characters"
      }
    },
    {
      "name": "age",
      "label": "Age",
      "type": "number",
      "required": true,
      "validation": {
        "min": 18,
        "message": "You must be 18 or older"
      }
    },
    {
      "name": "terms",
      "label": "I agree to the Terms and Conditions",
      "type": "checkbox",
      "required": true
    }
  ]
}
```

---

## File Upload Handling

### Configuring File Upload

```json
{
  "name": "document",
  "label": "Upload Document",
  "type": "file",
  "required": true,
  "accept": ".pdf,.doc,.docx,.jpg,.png",
  "maxSize": 10485760,
  "validation": {
    "message": "Please upload a valid file (max 10MB)"
  }
}
```

### Handling File Submission

```tsx
const handleSubmit = (data: any) => {
  // File is in FileList format
  if (data.document && data.document.length > 0) {
    const file = data.document[0]; // Get the actual file

    console.log("File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
    });

    // Create FormData for upload
    const formData = new FormData();
    formData.append("document", file);
    formData.append("name", data.name);

    // Upload to server
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => console.log("Upload success:", result))
      .catch((error) => console.error("Upload error:", error));
  }
};
```

### File Size Reference

```javascript
// Convert MB to bytes for maxSize
1 MB = 1024 * 1024 = 1048576 bytes
5 MB = 5 * 1024 * 1024 = 5242880 bytes
10 MB = 10 * 1024 * 1024 = 10485760 bytes
```

### Common File Accept Values

```json
{
  "accept": ".pdf", // PDF only
  "accept": ".pdf,.doc,.docx", // Documents
  "accept": ".jpg,.jpeg,.png,.gif", // Images
  "accept": ".pdf,.jpg,.jpeg,.png", // Mixed
  "accept": "image/*", // All images
  "accept": ".xlsx,.xls,.csv" // Spreadsheets
}
```

---

## Usage Tips

### 1. Loading JSON from File

```tsx
import formConfig from "./config/contact-form.json";

function App() {
  return <FormBuilder config={formConfig} onSubmit={handleSubmit} />;
}
```

### 2. Dynamic Form Loading

```tsx
const [formConfig, setFormConfig] = useState<FormConfig | null>(null);

useEffect(() => {
  fetch("/api/forms/contact")
    .then((res) => res.json())
    .then((data) => setFormConfig(data));
}, []);

if (!formConfig) return <div>Loading...</div>;

return <FormBuilder config={formConfig} onSubmit={handleSubmit} />;
```

### 3. Form Validation Testing

```tsx
const handleSubmit = (data: any) => {
  console.log("✅ Valid data:", data);

  // All fields are validated
  // File uploads are in FileList format
  // Access files with data.fieldName[0]
};
```

---

## Troubleshooting

### Issue: File validation not working

**Solution**: Make sure `maxSize` is in bytes, not MB.

### Issue: Conditional fields not showing

**Solution**: Check that the `when` field name matches exactly and the value comparison is correct.

### Issue: Custom styles not applying

**Solution**: Ensure class names don't conflict with default styles. Use more specific selectors if needed.

### Issue: Form not submitting

**Solution**: Check browser console for validation errors. All required fields must be filled.

---

## License

MIT License - Feel free to use in your projects!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/abir045/react-form-builder).
