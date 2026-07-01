import { useState } from "react";
 
export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
 
  // Computed synchronously on every render — never stale
  const errors = {};
 
  if (!values.name?.trim()) errors.name = "Required field";
  if (!values.imageUrl?.trim()) {
    errors.imageUrl = "Required field";
  } else {
    try {
      new URL(values.imageUrl);
      if (!values.imageUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?|#|$)/i)) {
        errors.imageUrl = "Must be image URL";
      }
    } catch {
      errors.imageUrl = "Enter a valid URL";
    }
  }
  if (!values.weather) errors.weather = "Required field";
 
  const isValid = Object.keys(errors).length === 0;
 
  const resetForm = () => {
    setValues(initialValues);
  };
 
  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    resetForm,
  };
}
 