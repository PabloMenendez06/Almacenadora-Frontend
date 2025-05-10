import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductRequest } from "../../services"; 

export const useDeleteProduct = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async (id) => {
    setIsDeleting(true);
    try {
      const response = await deleteProductRequest(id);

      if (response?.error) {
        toast.error(response.response?.data?.message || "Error al eliminar producto.");
        return null;
      }

      toast.success("Producto eliminado correctamente.");
      return response;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar producto. Intenta de nuevo.");
      return null;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteProduct,
    isDeleting,
  };
};
