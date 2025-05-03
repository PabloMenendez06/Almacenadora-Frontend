import { useState } from "react";
import { updateProductRequest } from "../../services";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProduct = async (id, productData) => {
    setIsLoading(true);
    try {
      const response = await updateProductRequest(id, productData);
      setIsLoading(false);

      if (response.error) {
        toast.error(response.error?.response?.data?.message || "Error al actualizar el producto.");
        return;
      }

      toast.success("Producto actualizado exitosamente");
    } catch (error) {
      setIsLoading(false);
      console.error("Error al actualizar producto:", error);
      toast.error("Ocurrió un error al actualizar el producto.");
    }
  };

  return { updateProduct, isLoading };
};
