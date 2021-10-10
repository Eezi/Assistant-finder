import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const checkFormValues = (form) => {
    const newErrors = {};
    if (!form.name || form.name === "")
      newErrors.name = "Nimi ei voi olla tyhjä";
    if (!form.phone || form.phone === "")
      newErrors.phone = "Puhelinnumero pitää täyttää";
    if (!form.email || form.email === "")
      newErrors.email = "Sähköposti pitää täyttää";
    if (!form.region || form.region === "")
      newErrors.region = "Paikkakunta pitää valita";
    if (!form.userType || form.userType === "")
      newErrors.userType = "Käyttäjätyyppi pitää valita";
    if (!form.password || form.password === "")
      newErrors.password = "Salasana puuttuu";
    if (!form.confirmPassword || form.confirmPassword === "")
      newErrors.confirmPassword = "Vahvistussalasana puuttuu";
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Salasanat eivät täsmää";
    }

    setErrors(newErrors);
    return newErrors;
  };

  return { errors, checkFormValues };
};
