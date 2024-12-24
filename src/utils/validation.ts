export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Only validate required fields
  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "streetAddress",
    "city",
    "state",
    "zipCode",
    "primaryInterest",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `${
        field.charAt(0).toUpperCase() +
        field.slice(1).replace(/([A-Z])/g, " $1")
      } is required`;
    }
  });

  // Add specific validations
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  return errors;
};

export const validateField = (name: string, value: any): string | null => {
  switch (name) {
    case "fullName":
      return !value?.trim() ? "Full name is required" : null;
    case "email":
      if (!value?.trim()) return "Email is required";
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? "Invalid email format"
        : null;
    case "phone":
      if (!value?.trim()) return "Required";
      if (!/^\d+$/.test(value)) return "Only digits";
      if (value.length !== 10) return "Enter 10 digits";
      return null;
    case "role":
      return !value?.trim() ? "Role is required" : null;
    case "organization":
      return !value?.trim() ? "Organization is required" : null;
    case "experience":
      if (value === undefined || value === "")
        return "Years of experience is required";
      return Number(value) < 0 ? "Experience cannot be negative" : null;
    case "primaryInterest":
      return !value ? "Please select your primary interest" : null;
    case "interests":
      return !value || (Array.isArray(value) && value.length === 0)
        ? "Please select at least one interest"
        : null;
    case "streetAddress":
      return !value?.trim() ? "Street address is required" : null;
    case "city":
      return !value?.trim() ? "City is required" : null;
    case "state":
      return !value?.trim() ? "State is required" : null;
    case "zipCode":
      if (!value?.trim()) return "ZIP code is required";
      if (!/^\d{6}$/.test(value)) return "ZIP code must be 6 digits";
      return null;
    default:
      return null;
  }
};

export const validateSection = (
  step: number,
  formData: any
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const fields =
    {
      1: ["fullName", "email", "phone"],
      2: ["streetAddress", "city", "state", "zipCode"],
      3: ["primaryInterest", "interests"], // Ensure both fields are validated
      4: [],
    }[step] || [];

  fields.forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};
