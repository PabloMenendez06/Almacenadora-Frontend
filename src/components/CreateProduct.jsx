import { useEffect } from "react";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProduct, useUpdateProduct, useListProviders, useListCategories } from "../shared/hooks";
import { productSchema as schema } from "../shared/validators";
import toast from "react-hot-toast";

export const CreateProduct = ({ productToEdit, onClose }) => {
  const { createProduct, isLoading } = useCreateProduct();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { providers } = useListProviders();
  const { categories } = useListCategories(); 

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      description: "",
      provider: "",
      category: "",
      entryDate: new Date().toISOString().split("T")[0],
      expirationDate: ""
    }
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
        expirationDate: formatDate(productToEdit.expirationDate),
        entryDate: formatDate(productToEdit.entryDate)
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
    } catch (error) {
      const { status, message } = error;
      if (status === 404 && message === "Categoría no encontrada") {
        toast.error("Categoría no encontrada");
      } else if (status === 404 && message === "Proveedor no encontrado") {
        toast.error("Proveedor no encontrado");
      } else if (status === 400) {
        toast.error("Todos los campos son obligatorios");
      } else {
        toast.error(message || "Error al registrar producto");
      }
    }
  };
  

  return (
    <div className="register-container">
      <h1>{productToEdit ? "Editar Producto" : "Registrar Producto"}</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input field="name" label="Nombre" {...register("name")} />
        <Input field="price" label="Precio" {...register("price")} type="number" />
        <Input field="stock" label="Stock" {...register("stock")} type="number" />

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            className={`input ${errors.description ? "input-error" : ""}`}
            {...register("description")}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="provider">Proveedor</label>
          <select
            id="provider"
            className={`input ${errors.provider ? "input-error" : ""}`}
            {...register("provider")}
          >
            <option value="">Selecciona un proveedor</option>
            {providers.map((provider) => (
                <option key={provider._id} value={provider.name}> {/* ← CAMBIO */}
                    {provider.name}
                </option>
            ))}
          </select>
          {errors.provider && <p className="error-message">{errors.provider.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            className={`input ${errors.category ? "input-error" : ""}`}
            {...register("category")}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
                <option key={category._id} value={category.name}> {/* ← CAMBIO */}
                    {category.name}
                </option>
            ))}
          </select>
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Fecha de Expiración</label>
          <input
            type="date"
            id="expirationDate"
            className="input"
            {...register("expirationDate")}
          />
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
          <button type="submit" disabled={isLoading || isUpdating}>
            {productToEdit ? "Guardar Cambios" : "Crear"}
          </button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

function formatDate(date) {
    return new Date(date).toISOString().split("T")[0];
  }
  