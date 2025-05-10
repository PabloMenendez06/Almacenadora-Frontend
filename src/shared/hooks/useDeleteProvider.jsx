import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProvider as deleteProviderRequest } from "../../services"; 

export const useDeleteProvider = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProvider = async (id) => {
    setIsDeleting(true);
    try {
      const response = await deleteProviderRequest(id);

      if (response?.error) {
        toast.error(response.response?.data?.message || "Error al eliminar proveedor.");
        return null;
      }

      toast.success("Proveedor eliminado correctamente.");
      return response;
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      toast.error("Error al eliminar proveedor. Intenta de nuevo.");
      return null;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteProvider,
    isDeleting,
  };
};
