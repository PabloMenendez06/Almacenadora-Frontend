import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { Input } from "./Input";
import { useWithdrawProduct, useSearchProductsByName } from "../shared/hooks";
import { withdrawSchema } from "../shared/validators";

export const WithdrawProduct = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { withdrawProduct, isLoading: isWithdrawing } = useWithdrawProduct();
  const { products, search, isLoading: isSearching } = useSearchProductsByName();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(withdrawSchema),
    mode: "onBlur",
    defaultValues: {
      productId: "",
      quantity: "",
      motive: "",
      destiny: "",
    },
  });

  const handleSearch = async (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) return;
    await search(value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setValue("productId", product._id);
  };

  const onSubmit = async (data) => {
    try {
      if (!selectedProduct) {
        toast.error("Selecciona un producto");
        return;
      }

      const { productId, ...rest } = data;
      await withdrawProduct(productId, rest);
      toast.success("Retiro registrado");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error al registrar retiro:", error);
      toast.error("Error al registrar el retiro");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Registrar Retiro</h1>

      <Input
        field="search"
        label="Buscar Producto"
        type="text"
        onChange={handleSearch}
      />

      {isSearching && <p>Buscando...</p>}
      {!isSearching && products.length > 0 && (
        <ul className="search-results">
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSelectProduct(product)}
              className={`search-item ${selectedProduct?._id === product._id ? "selected" : ""}`}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {selectedProduct && (
        <p style={{ fontStyle: "italic" }}>
          Producto seleccionado: <strong>{selectedProduct.name}</strong>
        </p>
      )}

      <input type="hidden" {...register("productId")} />

      <Input
        field="quantity"
        label="Cantidad a retirar"
        {...register("quantity")}
        type="number"
        showErrorMessage={!!errors.quantity}
        validationMessage={errors.quantity?.message}
      />
      <Input
        field="motive"
        label="Motivo"
        {...register("motive")}
        type="text"
        showErrorMessage={!!errors.motive}
        validationMessage={errors.motive?.message}
      />
      <Input
        field="destiny"
        label="Destino"
        {...register("destiny")}
        type="text"
        showErrorMessage={!!errors.destiny}
        validationMessage={errors.destiny?.message}
      />

      <div className="button-group">
        <button type="submit" disabled={isWithdrawing || !isValid}>
          Registrar
        </button>
      </div>
    </form>
  );
};
