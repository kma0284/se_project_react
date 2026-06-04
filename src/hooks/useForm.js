import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...values,
      [name]: value,
    };

    setValues(updatedValues);

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

    const updatedErrors = {
      ...errors,
      [name]: error,
    };

    setErrors(updatedErrors);

    const hasErrors = Object.values(updatedErrors).some((err) => err !== "");

    const allFieldsFilled =
      updatedValues.name.trim() &&
      updatedValues.imageUrl.trim() &&
      updatedValues.weather.trim();

    setIsValid(!hasErrors && allFieldsFilled);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  };
  function isValidUrl(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

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
