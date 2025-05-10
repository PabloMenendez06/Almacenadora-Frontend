import { useState } from "react";
import { createProduct as createProductRequest } from "../../services";

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createProduct = async ({
    name,
    description,
    provider,
    price,
    stock,
    category,
    entryDate,
    expirationDate,
  }) => {
    setIsLoading(true);
    try {
      const response = await createProductRequest({
        name,
        description,
        provider,
        price,
        stock,
        category,
        entryDate,
        expirationDate,
      });

      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Error desconocido";
      console.error("Error al registrar producto:", error.response || error);
      throw { status, message };
    }
  };

  return {
    createProduct,
    isLoading,
  };
};
