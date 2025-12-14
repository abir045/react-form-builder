// src/examples/BasicFormDemo.tsx

import { FormBuilder } from "../components/FormBuilder";
import type { FormConfig } from "../types/formBuilder.types";
// import { FormConfig } from '../types/formBuilder.types';

// const registrationConfig: FormConfig = {
//   formId: "user-registration",
//   title: "Create Your Account",
//   description: "Join our platform today and get started",
//   fields: [
//     {
//       name: "fullName",
//       type: "text",
//       label: "Full Name",
//       placeholder: "Enter your full name",
//       required: true,
//       validation: {
//         minLength: 3,
//         message: "Name must be at least 3 characters",
//       },
//       helperText: "Please enter your legal name",
//     },
//     {
//       name: "email",
//       type: "email",
//       label: "Email Address",
//       placeholder: "you@example.com",
//       required: true,
//       helperText: "We'll never share your email",
//     },
//     {
//       name: "phone",
//       type: "tel",
//       label: "Phone Number",
//       placeholder: "01712345678",
//       required: true,
//       helperText: "Bangladesh phone number format",
//     },
//     {
//       name: "age",
//       type: "number",
//       label: "Age",
//       placeholder: "Enter your age",
//       required: true,
//       validation: {
//         min: 18,
//         max: 100,
//         message: "You must be between 18 and 100 years old",
//       },
//     },
//     {
//       name: "country",
//       type: "select",
//       label: "Country",
//       required: true,
//       options: [
//         { value: "bd", label: "Bangladesh" },
//         { value: "in", label: "India" },
//         { value: "pk", label: "Pakistan" },
//         { value: "us", label: "United States" },
//         { value: "uk", label: "United Kingdom" },
//       ],
//     },
//     {
//       name: "hasExperience",
//       type: "select",
//       label: "Do you have programming experience?",
//       required: true,
//       options: [
//         { value: "yes", label: "Yes" },
//         { value: "no", label: "No" },
//       ],
//     },
//     {
//       name: "yearsOfExperience",
//       type: "number",
//       label: "Years of Experience",
//       placeholder: "Enter years",
//       required: true,
//       conditionalLogic: {
//         show: {
//           when: "hasExperience",
//           equals: "yes",
//         },
//       },
//       validation: {
//         min: 0,
//         max: 50,
//       },
//     },
//     {
//       name: "newsletter",
//       type: "checkbox",
//       label: "Subscribe to our newsletter for updates and tips",
//       defaultValue: false,
//       helperText: "You can unsubscribe at any time",
//     },
//     {
//       name: "terms",
//       type: "checkbox",
//       label: "I agree to the Terms and Conditions",
//       required: true,
//     },
//   ],
//   submitButton: {
//     text: "Create Account",
//     loadingText: "Creating your account...",
//   },
//   autoSave: true,
//   autoSaveDelay: 2000,
// };

// const contactFormConfig: FormConfig = {
//   formId: "contact-form", // Add this - it's required!
//   title: "Idea to Innovation: How to Build Your AI Project",
//   fields: [
//     {
//       type: "text",
//       label: "Your Name",
//       name: "yourName",
//       placeholder: "Enter your name",
//       required: true,
//       validation: {
//         minLength: 2, // Changed from 'min' to 'minLength' and moved inside validation
//       },
//     },
//     {
//       type: "text",
//       label: "Institute / Organization",
//       name: "institute",
//       placeholder: "Enter your institute or organization",
//       required: true,
//     },
//     {
//       type: "text",
//       label: "Department / Designation",
//       name: "designation",
//       placeholder: "Enter your department or designation",
//       required: true,
//     },
//     {
//       type: "tel", // Changed from 'text' to 'tel' for phone validation
//       label: "Contact Number (WhatsApp)",
//       name: "contactNumber",
//       placeholder: "+8801XXXXXXXXX",
//       required: true,
//       validation: {
//         minLength: 10, // Changed from 'min' to 'minLength'
//         maxLength: 15, // Changed from 'max' to 'maxLength'
//         pattern: "^\\+?[0-9]{10,15}$", // Optional: regex for phone validation
//         message: "Please enter a valid phone number",
//       },
//     },
//   ],
//   submitButton: {
//     text: "Submit",
//     loadingText: "Submitting...",
//   },
// };

const webdevApplication: FormConfig = {
  formId: "web-developer-application",
  title: "Web Developer Position Application",
  fields: [
    {
      type: "text",
      label: "Full Name",
      name: "fullName",
      placeholder: "Enter your full name",
      required: true,
      validation: {
        minLength: 2,
      },
    },
    {
      type: "email",
      label: "Email Address",
      name: "email",
      placeholder: "your.email@example.com",
      required: true,
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      type: "tel",
      label: "Phone Number",
      name: "phone",
      placeholder: "+8801XXXXXXXXX",
      required: true,
      validation: {
        minLength: 10,
        maxLength: 15,
        pattern: "^\\+?[0-9]{10,15}$",
        message: "Please enter a valid phone number",
      },
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "dateOfBirth",
      required: true,
      validation: {
        // max: "2006-12-10",
        message: "You must be at least 18 years old",
      },
      helperText: "Must be 18 years or older",
    },
    {
      type: "text",
      label: "Years of Experience",
      name: "experience",
      placeholder: "e.g., 3",
      required: true,
      validation: {
        pattern: "^[0-9]+$",
        message: "Please enter a valid number",
      },
    },
    {
      type: "radio",
      label: "Experience Level",
      name: "experienceLevel",
      required: true,
      options: [
        { value: "junior", label: "Junior (0-2 years)" },
        { value: "mid", label: "Mid-level (3-5 years)" },
        { value: "senior", label: "Senior (6+ years)" },
        { value: "lead", label: "Lead/Architect (10+ years)" },
      ],
      helperText: "Select your current experience level",
    },
    {
      type: "radio",
      label: "Current Employment Status",
      name: "employmentStatus",
      required: true,
      options: [
        { value: "employed", label: "Currently Employed" },
        { value: "unemployed", label: "Unemployed/Seeking" },
        { value: "student", label: "Student" },
        { value: "freelance", label: "Freelancing" },
      ],
    },
    {
      type: "heading",
      label: "Technical Skills *",
      name: "technical_skills_heading",
    },
    {
      type: "checkbox",
      label: "HTML",
      name: "skill_html",
      required: false,
    },
    {
      type: "checkbox",
      label: "CSS",
      name: "skill_css",
      required: false,
    },
    {
      type: "checkbox",
      label: "JavaScript",
      name: "skill_javascript",
      required: false,
    },
    {
      type: "checkbox",
      label: "TypeScript",
      name: "skill_typescript",
      required: false,
    },
    {
      type: "checkbox",
      label: "React",
      name: "skill_react",
      required: false,
    },
    {
      type: "checkbox",
      label: "Vue.js",
      name: "skill_vue",
      required: false,
    },
    {
      type: "checkbox",
      label: "Angular",
      name: "skill_angular",
      required: false,
    },
    {
      type: "checkbox",
      label: "Node.js",
      name: "skill_nodejs",
      required: false,
    },
    {
      type: "checkbox",
      label: "Python",
      name: "skill_python",
      required: false,
    },
    {
      type: "checkbox",
      label: "PHP",
      name: "skill_php",
      required: false,
    },
    {
      type: "heading",
      label: "Frameworks & Libraries",
      name: "frameworks_heading",
    },
    {
      type: "checkbox",
      label: "Next.js",
      name: "framework_nextjs",
      required: false,
    },
    {
      type: "checkbox",
      label: "Express.js",
      name: "framework_express",
      required: false,
    },
    {
      type: "checkbox",
      label: "Django",
      name: "framework_django",
      required: false,
    },
    {
      type: "checkbox",
      label: "Flask",
      name: "framework_flask",
      required: false,
    },
    {
      type: "checkbox",
      label: "Laravel",
      name: "framework_laravel",
      required: false,
    },
    {
      type: "checkbox",
      label: "Tailwind CSS",
      name: "framework_tailwind",
      required: false,
    },
    {
      type: "checkbox",
      label: "Bootstrap",
      name: "framework_bootstrap",
      required: false,
    },
    {
      type: "checkbox",
      label: "Material-UI",
      name: "framework_materialui",
      required: false,
    },
    {
      type: "checkbox",
      label: "Redux",
      name: "framework_redux",
      required: false,
    },
    {
      type: "checkbox",
      label: "Zustand",
      name: "framework_zustand",
      required: false,
    },
    {
      type: "heading",
      label: "Database Experience *",
      name: "database_heading",
    },
    {
      type: "checkbox",
      label: "MySQL",
      name: "database_mysql",
      required: false,
    },
    {
      type: "checkbox",
      label: "PostgreSQL",
      name: "database_postgresql",
      required: false,
    },
    {
      type: "checkbox",
      label: "MongoDB",
      name: "database_mongodb",
      required: false,
    },
    {
      type: "checkbox",
      label: "Redis",
      name: "database_redis",
      required: false,
    },
    {
      type: "checkbox",
      label: "Firebase",
      name: "database_firebase",
      required: false,
    },
    {
      type: "checkbox",
      label: "SQLite",
      name: "database_sqlite",
      required: false,
    },
    {
      type: "checkbox",
      label: "Oracle",
      name: "database_oracle",
      required: false,
    },
    {
      type: "checkbox",
      label: "MS SQL Server",
      name: "database_mssql",
      required: false,
    },
    {
      type: "heading",
      label: "Development Tools",
      name: "tools_heading",
    },
    {
      type: "checkbox",
      label: "Git",
      name: "tool_git",
      required: false,
    },
    {
      type: "checkbox",
      label: "GitHub",
      name: "tool_github",
      required: false,
    },
    {
      type: "checkbox",
      label: "GitLab",
      name: "tool_gitlab",
      required: false,
    },
    {
      type: "checkbox",
      label: "Docker",
      name: "tool_docker",
      required: false,
    },
    {
      type: "checkbox",
      label: "Kubernetes",
      name: "tool_kubernetes",
      required: false,
    },
    {
      type: "checkbox",
      label: "Webpack",
      name: "tool_webpack",
      required: false,
    },
    {
      type: "checkbox",
      label: "Vite",
      name: "tool_vite",
      required: false,
    },
    {
      type: "checkbox",
      label: "Jest",
      name: "tool_jest",
      required: false,
    },
    {
      type: "checkbox",
      label: "Cypress",
      name: "tool_cypress",
      required: false,
    },
    {
      type: "checkbox",
      label: "Postman",
      name: "tool_postman",
      required: false,
    },
    {
      type: "checkbox",
      label: "Figma",
      name: "tool_figma",
      required: false,
    },
    {
      type: "checkbox",
      label: "VS Code",
      name: "tool_vscode",
      required: false,
    },
    {
      type: "heading",
      label: "Availability *",
      name: "availability_heading",
    },
    {
      type: "checkbox",
      label: "Full-time",
      name: "availability_fulltime",
      required: false,
    },
    {
      type: "checkbox",
      label: "Part-time",
      name: "availability_parttime",
      required: false,
    },
    {
      type: "checkbox",
      label: "Contract",
      name: "availability_contract",
      required: false,
    },
    {
      type: "checkbox",
      label: "Freelance",
      name: "availability_freelance",
      required: false,
    },
    {
      type: "checkbox",
      label: "Remote",
      name: "availability_remote",
      required: false,
    },
    {
      type: "checkbox",
      label: "On-site",
      name: "availability_onsite",
      required: false,
    },
    {
      type: "checkbox",
      label: "Hybrid",
      name: "availability_hybrid",
      required: false,
    },
    {
      type: "radio",
      label: "Preferred Work Location",
      name: "preferredLocation",
      required: true,
      options: [
        { value: "remote_only", label: "Remote Only" },
        { value: "office_only", label: "Office Only" },
        { value: "flexible", label: "Flexible/Either" },
      ],
      helperText: "What's your preference for work location?",
    },
    {
      type: "date",
      label: "Available Start Date",
      name: "startDate",
      required: true,
      validation: {
        // min: "2024-12-10",
        message: "Start date must be today or in the future",
      },
      helperText: "When can you start working with us?",
    },
    {
      type: "radio",
      label: "Salary Expectations (Annual)",
      name: "salaryRange",
      required: true,
      options: [
        { value: "below_30k", label: "Below $30,000" },
        { value: "30k_50k", label: "$30,000 - $50,000" },
        { value: "50k_75k", label: "$50,000 - $75,000" },
        { value: "75k_100k", label: "$75,000 - $100,000" },
        { value: "100k_plus", label: "$100,000+" },
      ],
    },
    {
      type: "radio",
      label: "Do you require visa sponsorship?",
      name: "visaSponsorship",
      required: true,
      options: [
        { value: "yes", label: "Yes, I need sponsorship" },
        { value: "no", label: "No, I'm authorized to work" },
        { value: "have_visa", label: "I already have a work visa" },
      ],
    },
    {
      type: "heading",
      label: "Additional Information",
      name: "additional_info_heading",
    },
    {
      type: "text",
      label: "Portfolio/GitHub URL",
      name: "portfolio",
      placeholder: "https://github.com/yourusername",
      required: false,
      helperText: "Share your portfolio website or GitHub profile",
    },
    {
      type: "text",
      label: "LinkedIn Profile",
      name: "linkedin",
      placeholder: "https://linkedin.com/in/yourprofile",
      required: false,
    },
    {
      type: "textarea",
      label: "Brief Introduction",
      name: "introduction",
      placeholder:
        "Tell us about yourself, your experience, and why you're interested in this position...",
      required: true,
      rows: 4,
      validation: {
        minLength: 50,
        maxLength: 500,
        message: "Please provide an introduction between 50-500 characters",
      },
      helperText: "Minimum 50 characters, maximum 500 characters",
    },
    {
      type: "textarea",
      label: "Notable Projects",
      name: "projects",
      placeholder:
        "Describe 2-3 projects you're most proud of, including technologies used and your role...",
      required: false,
      rows: 5,
      helperText: "Optional: Share details about your best work",
    },
    {
      type: "textarea",
      label: "Why do you want to work with us?",
      name: "motivation",
      placeholder: "What interests you about this position and our company?",
      required: true,
      rows: 3,
      validation: {
        minLength: 30,
        message: "Please provide at least 30 characters",
      },
    },
  ],
  submitButton: {
    text: "Submit Application",
    loadingText: "Submitting...",
  },
};

export const BasicFormDemo = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("✅ Form submitted successfully!", data);
    alert(`Welcome, ${data.fullName}! Your account has been created.`);
  };

  const handleError = (errors: Record<string, unknown>) => {
    console.error("❌ Form submission failed:", errors);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <FormBuilder
        config={webdevApplication}
        onSubmit={handleSubmit}
        onError={handleError}
      />
    </div>
  );
};
