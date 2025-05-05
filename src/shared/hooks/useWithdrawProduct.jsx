import { useState } from "react";
import { withdrawProduct as withdrawProductRequest } from "../../services";
import toast from "react-hot-toast";

export const useWithdrawProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withdrawProduct = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await withdrawProductRequest(id, data);
      toast.success("Producto retirado exitosamente");
      return response;
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Error desconocido al retirar producto";
      toast.error(message);
      console.error("Error al retirar producto:", error.response || error);
      throw { status, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    withdrawProduct,
    isLoading,
  };
};
