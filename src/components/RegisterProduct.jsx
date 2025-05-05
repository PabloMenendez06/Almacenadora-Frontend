import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { Input } from "./Input";
import { useRegisterProduct, useSearchProductsByName } from "../shared/hooks";
import { registerProductSchema } from "../shared/validators";

export const RegisterProduct = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { registerProduct, isLoading: isRegistering } = useRegisterProduct();
  const { products, search, isLoading: isSearching } = useSearchProductsByName();

  const {
    register: registerProductForm,
    handleSubmit,
    setValue: setProductValue,
    formState: { errors: registerErrors, isValid: isRegisterValid },
  } = useForm({
    resolver: yupResolver(registerProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      quantity: "",
    },
  });

  const handleSearch = async (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) return;
    await search(value);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductValue("productId", product._id);
  };

  const onSubmit = async (data) => {
    try {
      if (!selectedProduct) {
        toast.error("Selecciona un producto");
        return;
      }

      await registerProduct(selectedProduct._id, data);
      toast.success("Producto registrado");
      onClose();
    } catch (error) {
      console.error("Error al registrar producto:", error);
      toast.error("Error al registrar el producto");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Registrar Producto</h1>

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

      <Input
        field="quantity"
        label="Cantidad"
        {...registerProductForm("quantity")}
        type="number"
        showErrorMessage={!!registerErrors.quantity}
        validationMessage={registerErrors.quantity?.message}
      />

      <div className="button-group">
        <button type="submit" disabled={isRegistering || !isRegisterValid}>
          Registrar
        </button>
      </div>
    </form>
  );
};
