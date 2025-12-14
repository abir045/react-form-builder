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

// const hackathonFormJSON: FormConfig = {
//   formId: "hackathon-2024",
//   title: "Hackathon 2024 Registration",
//   description: "Join us for 48 hours of innovation, coding, and fun!",
//   resetOnSuccess: true,
//   submitButton: {
//     text: "Register for Hackathon",
//     loadingText: "Submitting...",
//   },
//   fields: [
//     {
//       type: "heading",
//       name: "personal_info",
//       label: "👤 Personal Information",
//     },
//     {
//       name: "full_name",
//       type: "text",
//       label: "Full Name",
//       required: true,
//     },
//     {
//       name: "email",
//       type: "email",
//       label: "Email Address",
//       required: true,
//     },
//     {
//       name: "student_status",
//       type: "radio",
//       label: "Are you a student?",
//       required: true,
//       options: [
//         { label: "Yes", value: "yes" },
//         { label: "No", value: "no" },
//       ],
//     },
//     {
//       name: "skills",
//       type: "textarea",
//       label: "Technical Skills",
//       required: true,
//       rows: 4,
//     },
//     {
//       name: "code_of_conduct",
//       type: "checkbox",
//       label: "I agree to the Code of Conduct",
//       required: true,
//     },
//   ],
// };

const hackathonFormJSON: FormConfig = {
  formId: "hackathon-2024",
  title: "Hackathon 2024 Registration",
  titleClassName:
    "text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center",
  description: "Join us for 48 hours of innovation, coding, and fun!",
  descriptionClassName: "text-xl text-gray-600 text-center italic font-light",
  resetOnSuccess: true,

  submitButton: {
    text: "🚀 Register for Hackathon",
    loadingText: "⏳ Submitting...",
    className:
      "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-lg font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300",
  },

  fields: [
    // HEADING with custom styling
    {
      type: "heading",
      name: "personal_info",
      label: "👤 Personal Information",
      inputClassName:
        "text-3xl font-extrabold text-purple-700 border-b-4 border-purple-300 pb-3 mt-8",
      wrapperClassName: "bg-purple-50 p-4 rounded-lg",
    },

    // TEXT INPUT with custom styling
    {
      name: "full_name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      labelClassName:
        "text-lg font-bold text-purple-800 uppercase tracking-wide",
      inputClassName:
        "bg-purple-50 border-2 border-purple-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-200 rounded-xl text-lg font-semibold",
      wrapperClassName:
        "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow",
      errorClassName: "text-red-600 font-bold text-base",
    },

    // EMAIL INPUT with custom styling
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "john@example.com",
      required: true,
      labelClassName: "text-base font-semibold text-blue-700",
      inputClassName:
        "bg-blue-50 border-2 border-blue-400 focus:border-blue-600 rounded-2xl shadow-inner",
      wrapperClassName:
        "p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg",
      errorClassName: "text-red-700 italic font-semibold",
    },

    // PHONE INPUT with custom styling
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "+1 (555) 123-4567",
      required: true,
      labelClassName: "text-green-700 font-bold",
      inputClassName: "bg-green-50 border-green-400 border-2 rounded-full px-6",
      wrapperClassName: "bg-green-100 p-4 rounded-2xl",
    },

    // DATE INPUT with custom styling
    {
      name: "date_of_birth",
      type: "date",
      label: "Date of Birth",
      required: true,
      labelClassName: "text-orange-700 font-extrabold text-lg",
      inputClassName:
        "bg-orange-50 border-orange-400 border-3 rounded-lg shadow-lg",
      wrapperClassName: "bg-orange-100 p-5 rounded-xl",
    },

    // HEADING 2
    {
      type: "heading",
      name: "education_heading",
      label: "🎓 Education & Background",
      inputClassName:
        "text-3xl font-black text-blue-600 border-l-8 border-blue-600 pl-4",
      wrapperClassName:
        "bg-gradient-to-r from-blue-100 to-cyan-100 p-5 rounded-2xl my-6",
    },

    // RADIO INPUT with custom styling
    {
      name: "student_status",
      type: "radio",
      label: "Are you a student?",
      required: true,
      options: [
        { label: "✅ Yes, I'm a student", value: "yes" },
        { label: "💼 No, I'm a professional", value: "no" },
        { label: "🎓 Recent graduate", value: "graduate" },
      ],
      labelClassName: "text-2xl font-bold text-indigo-700",
      inputClassName:
        "w-6 h-6 text-indigo-600 focus:ring-indigo-500 border-indigo-400",
      wrapperClassName:
        "bg-white border-4 border-indigo-300 p-6 rounded-2xl shadow-xl",
    },

    // SELECT INPUT with custom styling
    {
      name: "year_of_study",
      type: "select",
      label: "Year of Study",
      required: true,
      options: [
        { label: "Freshman (1st year)", value: "1" },
        { label: "Sophomore (2nd year)", value: "2" },
        { label: "Junior (3rd year)", value: "3" },
        { label: "Senior (4th year)", value: "4" },
      ],
      labelClassName: "text-pink-700 font-black text-xl",
      inputClassName:
        "bg-pink-50 border-pink-500 border-3 rounded-2xl text-pink-900 font-bold shadow-lg cursor-pointer",
      wrapperClassName:
        "bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-3xl",
    },

    // HEADING 3
    {
      type: "heading",
      name: "experience_heading",
      label: "💻 Technical Experience",
      inputClassName:
        "text-4xl font-black text-green-600 underline decoration-wavy decoration-green-400",
      wrapperClassName:
        "bg-green-50 p-6 rounded-3xl border-4 border-green-400 my-8",
    },

    // TEXTAREA with custom styling
    {
      name: "skills",
      type: "textarea",
      label: "Technical Skills",
      placeholder: "Python, React, Machine Learning, Docker...",
      required: true,
      rows: 6,
      labelClassName: "text-2xl font-extrabold text-teal-700 uppercase",
      inputClassName:
        "bg-teal-50 border-4 border-teal-400 focus:border-teal-600 rounded-3xl text-lg font-mono shadow-2xl",
      wrapperClassName:
        "bg-gradient-to-br from-teal-100 to-cyan-100 p-8 rounded-3xl border-2 border-teal-300",
      errorClassName: "text-red-700 font-black text-lg",
    },

    // URL INPUT with custom styling
    {
      name: "github_url",
      type: "url",
      label: "GitHub Profile (Optional)",
      placeholder: "https://github.com/yourusername",
      labelClassName: "text-gray-800 font-bold text-lg",
      inputClassName:
        "bg-gray-100 border-gray-400 border-2 rounded-xl font-mono text-gray-700",
      wrapperClassName: "bg-gray-50 p-4 rounded-xl shadow-inner",
    },

    // HEADING 4
    {
      type: "heading",
      name: "team_heading",
      label: "👥 Team Information",
      inputClassName:
        "text-3xl font-black text-yellow-600 bg-yellow-100 p-4 rounded-2xl shadow-lg",
      wrapperClassName: "my-6",
    },

    // NUMBER INPUT with custom styling
    {
      name: "team_size",
      type: "number",
      label: "Team Size (including you)",
      placeholder: "4",
      required: true,
      labelClassName: "text-yellow-800 font-extrabold text-xl",
      inputClassName:
        "bg-yellow-50 border-yellow-500 border-4 rounded-full text-center text-2xl font-black text-yellow-900",
      wrapperClassName: "bg-yellow-100 p-6 rounded-3xl shadow-2xl",
    },

    // CHECKBOX with custom styling
    {
      name: "code_of_conduct",
      type: "checkbox",
      label: "I agree to abide by the MLH Code of Conduct",
      required: true,
      labelClassName: "text-red-700 font-bold text-lg",
      inputClassName:
        "w-8 h-8 text-red-600 focus:ring-red-500 border-red-400 rounded-lg",
      wrapperClassName:
        "bg-red-50 border-4 border-red-300 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow",
    },

    // CHECKBOX 2 with different styling
    {
      name: "marketing_emails",
      type: "checkbox",
      label: "I want to receive emails about future events",
      labelClassName: "text-gray-600 italic",
      inputClassName: "w-5 h-5 text-blue-500 rounded",
      wrapperClassName: "p-3 bg-gray-50 rounded-lg",
    },

    // HEADING 5
    {
      type: "heading",
      name: "final_heading",
      label: "🎉 Almost Done!",
      inputClassName:
        "text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-center animate-pulse",
      wrapperClassName:
        "bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-8 rounded-3xl my-10 border-8 border-double border-purple-400",
    },

    // TEXTAREA 2
    {
      name: "additional_comments",
      type: "textarea",
      label: "Any questions or special requests?",
      placeholder: "Let us know...",
      rows: 3,
      labelClassName: "text-indigo-600 font-semibold",
      inputClassName: "bg-indigo-50 border-indigo-300 rounded-2xl",
      wrapperClassName: "p-4",
    },
  ],
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
        config={hackathonFormJSON}
        onSubmit={handleSubmit}
        onError={handleError}
        classNames={{
          container: "shadow-2xl",
          input: "text-base",
          label: "font-bold text-gray-800",
          error: "font-medium",
        }}
      />
    </div>
  );
};
