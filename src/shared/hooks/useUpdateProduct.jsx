import { useState } from "react";
import { updateProduct as updateProductRequest } from "../../services";

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProduct = async (id, productData) => {
    setIsLoading(true);
    try {
      const response = await updateProductRequest(id, productData);
      setIsLoading(false);

      return response;
    } catch (error) {
      setIsLoading(false);

      const status = error.response?.status;
      const message = error.response?.data?.message || "Error desconocido";
      console.error("Error al actualizar producto:", error.response || error);

      throw { status, message };
    }
  };

  return {
    updateProduct,
    isLoading,
  };
};
