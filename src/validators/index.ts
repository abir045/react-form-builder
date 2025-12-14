// // src/validators/index.ts

// src/validators/index.ts

import { z } from "zod";
import type { FieldConfig } from "../types/formBuilder.types";

/**
 * Creates a Zod schema for a single field based on its configuration
 */

export const createFieldSchema = (field: FieldConfig) => {
  let schema: any;

  // 1️⃣ Base schema by field type
  switch (field.type) {
    case "email":
      schema = z.string().email("Invalid email address");
      break;

    case "url":
      schema = z.string().url("Please enter a valid URL");
      break;

    case "number":
      schema = z.coerce.number();
      break;

    case "tel":
      schema = z
        .string()
        .regex(/^\+?\d+$/, "Phone number must contain only digits")
        .min(6, "Phone number is too short")
        .max(15, "Phone number is too long");
      break;

    case "date":
      schema = z.string();

      if (field.validation?.min) {
        schema = schema.refine(
          (val: string) => {
            if (!val) return true;
            return new Date(val) >= new Date(field.validation!.min as number);
          },
          {
            message:
              field.validation.message ||
              `Date must be after ${field.validation.min}`,
          }
        );
      }

      if (field.validation?.max) {
        schema = schema.refine(
          (val: string) => {
            if (!val) return true;
            return new Date(val) <= new Date(field.validation!.max as number);
          },
          {
            message:
              field.validation.message ||
              `Date must be before ${field.validation.max}`,
          }
        );
      }
      break;

    case "checkbox":
      schema = z.boolean();
      break;

    case "file":
      schema = z.any();
      break;

    case "radio":
    case "select":
      schema = z.string();
      break;

    default:
      // text, password, textarea
      schema = z.string();
  }

  // 2️⃣ Apply additional validations (BEFORE optional)
  if (field.validation && field.type !== "checkbox" && field.type !== "date") {
    const { minLength, maxLength, min, max, pattern } = field.validation;

    if (
      minLength &&
      ["text", "password", "textarea", "email", "url", "tel"].includes(
        field.type
      )
    ) {
      schema = schema.min(
        minLength,
        field.validation.message || `Minimum ${minLength} characters required`
      );
    }

    if (
      maxLength &&
      ["text", "password", "textarea", "email", "url", "tel"].includes(
        field.type
      )
    ) {
      schema = schema.max(
        maxLength,
        field.validation.message || `Maximum ${maxLength} characters allowed`
      );
    }

    if (min !== undefined && field.type === "number") {
      schema = schema.min(
        min,
        field.validation.message || `Minimum value is ${min}`
      );
    }

    if (max !== undefined && field.type === "number") {
      schema = schema.max(
        max,
        field.validation.message || `Maximum value is ${max}`
      );
    }

    if (pattern && typeof pattern === "string") {
      schema = schema.regex(
        new RegExp(pattern),
        field.validation.message || "Invalid format"
      );
    }
  }

  // 3️⃣ Apply required / optional logic LAST (CRITICAL FIX)
  if (field.required) {
    if (field.type === "checkbox") {
      schema = schema.refine((val: boolean) => val === true, {
        message: field.validation?.message || "This field must be checked",
      });
    } else if (field.type === "file") {
      schema = z.any().refine(
        (val) => {
          if (!(val instanceof FileList)) return false;
          if (val.length === 0) return false;

          const file = val[0];

          // ✅ File type validation
          if (field.accept) {
            const allowedTypes = field.accept
              .split(",")
              .map((type) => type.trim().toLowerCase());

            const fileExtension =
              "." + file.name.split(".").pop()?.toLowerCase();

            if (!allowedTypes.includes(fileExtension)) {
              return false;
            }
          }

          // ✅ File size validation
          if (field.maxSize && file.size > field.maxSize) {
            return false;
          }

          return true;
        },
        {
          message:
            field.validation?.message ||
            "Invalid file. Please upload a valid file.",
        }
      );
    } else {
      schema = schema.min(
        1,
        field.validation?.message || "This field is required"
      );
    }
  } else {
    if (field.type !== "checkbox") {
      schema = schema.optional().or(z.literal(""));
    } else {
      schema = schema.optional();
    }
  }

  return schema;
};

/**
 * Creates a Zod schema for the entire form
 */
export const createFormSchema = (fields: FieldConfig[]) => {
  const schemaObject: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.type !== "heading") {
      schemaObject[field.name] = createFieldSchema(field);
    }
  });

  return z.object(schemaObject);
};

// import { z } from "zod";
// import type { FieldConfig } from "../types/formBuilder.types";

// /**
//  * Creates a Zod schema for a single field based on its configuration
//  */

// export const URL_VALIDATION = {
//   pattern: {
//     value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
//     message: "Please enter a valid URL",
//   },
// };

// export const createFieldSchema = (field: FieldConfig) => {
//   let schema: any;

//   // Base schema by field type
//   switch (field.type) {
//     case "email":
//       schema = z.string().email("Invalid email address");
//       break;

//     case "url": // Add URL case
//       schema = z.string().url("Please enter a valid URL");
//       break;

//     case "number":
//       // Use z.coerce.number() - it automatically handles type coercion
//       schema = z.coerce.number();
//       break;

//     case "tel":
//       schema = z
//         .string()
//         .regex(/^\+?\d+$/, "Phone number must contain only digits")
//         .min(6, "Phone number is too short")
//         .max(15, "Phone number is too long");
//       break;

//     case "date":
//       schema = z.string(); // Date inputs return strings in YYYY-MM-DD format

//       // Apply date-specific validations
//       if (field.validation) {
//         if (field.validation.min) {
//           schema = schema.refine(
//             (val: string) => {
//               if (!val) return true; // Allow empty if not required
//               return new Date(val) >= new Date(field.validation!.min as number);
//             },
//             {
//               message:
//                 field.validation?.message ||
//                 `Date must be after ${field.validation.min}`,
//             }
//           );
//         }

//         if (field.validation.max) {
//           schema = schema.refine(
//             (val: string) => {
//               if (!val) return true; // Allow empty if not required
//               return new Date(val) <= new Date(field.validation!.max as number);
//             },
//             {
//               message:
//                 field.validation?.message ||
//                 `Date must be before ${field.validation.max}`,
//             }
//           );
//         }
//       }
//       break;

//     case "checkbox":
//       schema = z.boolean();
//       break;

//     case "file":
//       schema = z.any();
//       break;

//     case "radio":
//       schema = z.string();
//       break;

//     case "select":
//       schema = z.string();
//       break;

//     default:
//       // text, password, textarea
//       schema = z.string();
//   }

//   // Apply required validation
//   if (field.required) {
//     if (field.type === "checkbox") {
//       schema = schema.refine((val: boolean) => val === true, {
//         message: field.validation?.message || "This field must be checked",
//       });
//     } else if (field.type === "file") {
//       schema = z.any().refine((val) => val && val.length > 0, {
//         message: field.validation?.message || "File is required",
//       });
//     } else if (field.type === "date") {
//       schema = schema.min(1, field.validation?.message || "Date is required");
//     } else {
//       schema = schema.min(
//         1,
//         field.validation?.message || "This field is required"
//       );
//     }
//   } else {
//     // Make field optional if not required
//     if (field.type !== "checkbox") {
//       schema = schema.optional().or(z.literal(""));
//     } else {
//       schema = schema.optional();
//     }
//   }

//   // Apply additional validations from config (skip for date type as it's already handled)
//   if (field.validation && field.type !== "checkbox" && field.type !== "date") {
//     const { minLength, maxLength, min, max, pattern } = field.validation;

//     if (
//       minLength &&
//       (field.type === "text" ||
//         field.type === "password" ||
//         field.type === "textarea" ||
//         field.type === "email" ||
//         field.type === "url")
//     ) {
//       schema = schema.min(
//         minLength,
//         field.validation.message || `Minimum ${minLength} characters required`
//       );
//     }

//     if (
//       maxLength &&
//       (field.type === "text" ||
//         field.type === "password" ||
//         field.type === "textarea" ||
//         field.type === "email" ||
//         field.type === "url")
//     ) {
//       schema = schema.max(
//         maxLength,
//         field.validation.message || `Maximum ${maxLength} characters allowed`
//       );
//     }

//     if (min !== undefined && field.type === "number") {
//       schema = schema.min(
//         min,
//         field.validation.message || `Minimum value is ${min}`
//       );
//     }

//     if (max !== undefined && field.type === "number") {
//       schema = schema.max(
//         max,
//         field.validation.message || `Maximum value is ${max}`
//       );
//     }

//     if (pattern && typeof pattern === "string") {
//       schema = schema.regex(
//         new RegExp(pattern),
//         field.validation.message || "Invalid format"
//       );
//     }
//   }

//   return schema;
// };

// /**
//  * Creates a Zod schema for the entire form
//  */
// export const createFormSchema = (fields: FieldConfig[]) => {
//   const schemaObject: Record<string, any> = {};

//   fields.forEach((field) => {
//     // Skip heading fields as they don't need validation
//     if (field.type !== "heading") {
//       schemaObject[field.name] = createFieldSchema(field);
//     }
//   });

//   return z.object(schemaObject);
// };
