import { useState } from "react";
import { deleteProductRequest } from "../../services";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteProductRequest(id);
      setIsLoading(false);

      if (response.error) {
        toast.error(response.error?.response?.data?.message || "Error al eliminar el producto.");
        return;
      }

      toast.success("Producto eliminado correctamente");
    } catch (error) {
      setIsLoading(false);
      console.error("Error al eliminar producto:", error);
      toast.error("Ocurrió un error al eliminar el producto.");
    }
  };

  return { deleteProduct, isLoading };
};
