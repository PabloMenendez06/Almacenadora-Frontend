import { useState } from "react";
import { registerProduct as registerProductRequest } from "../../services";
import toast from "react-hot-toast";

export const useRegisterProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerProduct = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await registerProductRequest(id, data);
      toast.success("Producto registrado exitosamente");
      return response;
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Error desconocido al registrar producto";
      toast.error(message);
      console.error("Error al registrar producto:", error.response || error);
      throw { status, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerProduct,
    isLoading,
  };
};
