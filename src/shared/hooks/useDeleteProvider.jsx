import { useState } from "react";
import { deleteProvider as deleteProviderRequest } from "../../services";
import toast from "react-hot-toast";

export const useDeleteProvider = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProvider = async (id) => {
    setIsDeleting(true);
    try {
      const response = await deleteProviderRequest(id);
      setIsDeleting(false);

      if (response.error) {
        toast.error(response.error?.response?.data || "Error al eliminar proveedor.");
        return null;
      }

      toast.success("Proveedor eliminado correctamente.");
      return response.data;
    } catch (error) {
      setIsDeleting(false);
      toast.error("Error al eliminar proveedor. Intenta de nuevo.");
      return null;
    }
  };

  return {
    deleteProvider,
    isDeleting,
  };
};
