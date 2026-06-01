import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    if (!value.trim()) {
      error = "Required field";
    }

    if (name === "imageUrl" && value) {
      if (!isValidUrl(value)) {
        error = "Enter a valid URL";
      } else if (!value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        error = "URL must be an image (jpg, png, gif, webp)";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    setErrors,
    resetForm,
  };
}
