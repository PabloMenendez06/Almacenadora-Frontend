import * as yup from 'yup';

export const providerSchema = yup.object({
  name: yup
  .string()
  .required("Nombre es requerido"),
  email: yup
  .string()
  .email("Correo inválido")
  .required("Correo es requerido"),
  number: yup
  .string()
  .required("Número es requerido"),
});
