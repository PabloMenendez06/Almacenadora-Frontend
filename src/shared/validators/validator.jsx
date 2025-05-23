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

export const productSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  price: yup.number().required("El precio es obligatorio").positive("El precio debe ser positivo"),
  stock: yup.number().required("El stock es obligatorio").min(1, "El stock debe ser al menos 1"),
  description: yup.string().required("La descripción es obligatoria").min(10, "La descripcio debe ser al menos de 10 caracteres"),
  provider: yup.string().required("Proveedor es obligatorio"),
  category: yup.string().required("Categoría es obligatoria"),
  entryDate: yup.date().required("La fecha de entrada es obligatoria"),
  expirationDate: yup.date().required("La fecha de expiración es obligatoria"),
});

export const withdrawSchema = yup.object({
  productId: yup.string().required("Producto obligatorio"),
  quantity: yup
    .number()
    .required("Cantidad obligatoria")
    .positive("Debe ser mayor que 0")
    .integer("Debe ser un número entero"),
  motive: yup.string().required("Motivo obligatorio"),
  destiny: yup.string().required("Destino obligatorio"),
});

export const registerProductSchema = yup.object({
  productId: yup.string().required("Producto obligatorio"),
  quantity: yup
    .number()
    .required("Cantidad obligatoria")
    .positive("Debe ser mayor que 0")
    .integer("Debe ser un número entero"),
});

