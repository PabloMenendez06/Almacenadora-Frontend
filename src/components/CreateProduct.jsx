import { useEffect } from "react";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateProduct,
  useUpdateProduct,
  useListProviders,
  useListCategories,
} from "../shared/hooks";
import { productSchema } from "../shared/validators";
import toast from "react-hot-toast";

export const CreateProduct = ({ productToEdit, onClose }) => {
  const { createProduct, isLoading } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { providers } = useListProviders();
  const { categories } = useListCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      description: "",
      provider: "",
      category: "",
      entryDate: new Date().toISOString().split("T")[0],
      expirationDate: "",
    },
  });

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        price: productToEdit.price,
        stock: productToEdit.stock,
        description: productToEdit.description,
        provider: productToEdit.provider?.name || "",
        category: productToEdit.category?.name || "",
        entryDate: formatDate(productToEdit.entryDate),
        expirationDate: formatDate(productToEdit.expirationDate),
      });
      
    } else {
      reset({
        name: "",
        price: "",
        stock: "",
        description: "",
        provider: "",
        category: "",
        entryDate: new Date().toISOString().split("T")[0],
        expirationDate: "",
      });
    }
  }, [productToEdit, reset]);

  const onSubmit = async (data) => {
    const selectedProvider = providers.find(p => p.name === data.provider);
    const selectedCategory = categories.find(c => c.name === data.category);

    const productData = {
      ...data,
      entryDate: formatDate(data.entryDate),
      expirationDate: formatDate(data.expirationDate),
      provider: selectedProvider?.name || "",
      category: selectedCategory?.name || "",
    };

    try {
      if (productToEdit) {
        await updateProduct(productToEdit._id, productData);
        toast.success("Producto actualizado");
      } else {
        await createProduct(productData);
        toast.success("Producto registrado exitosamente");
      }
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error al enviar producto:", error);
      const { status, message } = error || {};
      if (status === 404 && message === "Categoría no encontrada") {
        toast.error("Categoría no encontrada");
      } else if (status === 404 && message === "Proveedor no encontrado") {
        toast.error("Proveedor no encontrado");
      } else {
        toast.error(message || "Error al registrar producto");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>{productToEdit ? "Editar Producto" : "Registrar Producto"}</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          field="name"
          label="Nombre"
          {...register("name")}
          showErrorMessage={!!errors.name}
          validationMessage={errors.name?.message}
        />
        <Input
          field="price"
          label="Precio"
          type="number"
          {...register("price")}
          showErrorMessage={!!errors.price}
          validationMessage={errors.price?.message}
        />
        <Input
          field="stock"
          label="Stock"
          type="number"
          {...register("stock")}
          showErrorMessage={!!errors.stock}
          validationMessage={errors.stock?.message}
        />

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            className={`input ${errors.description ? "input-error" : ""}`}
            {...register("description")}
          />
          {errors.description && (
            <p className="error-message">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="provider">Proveedor</label>
          <select
            id="provider"
            className={`input ${errors.provider ? "input-error" : ""}`}
            {...register("provider")}
          >
            <option value="">Selecciona un proveedor</option>
            {providers.map((p) => p.name).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {errors.provider && (
            <p className="error-message">{errors.provider.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            className={`input ${errors.category ? "input-error" : ""}`}
            {...register("category")}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((c) => c.name).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Fecha de Expiración</label>
          <input
            type="date"
            id="expirationDate"
            className={`input ${errors.expirationDate ? "input-error" : ""}`}
            {...register("expirationDate")}
          />
          {errors.expirationDate && (
            <p className="error-message">{errors.expirationDate.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="entryDate">Fecha de Entrada</label>
          <input
            type="date"
            id="entryDate"
            className="input"
            {...register("entryDate")}
            disabled
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={isLoading || isUpdating || !isValid}>
            {productToEdit ? "Guardar Cambios" : "Crear"}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
