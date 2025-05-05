import * as yup from "yup";

export const userSchema = yup.object({
  username: yup
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(20, "El nombre de usuario no puede exceder los 20 caracteres")
    .required("Nombre de usuario requerido"),
  
  avatarUrl: yup
    .string()
    .url("Debe ser una URL válida")
    .required("URL del avatar requerida"),
});
