import { useState } from "react";
import toast from "react-hot-toast";
import { updateProvider as updateProviderRequest } from "../../services"; 

export const useUpdateProvider = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProvider = async (id, updatedData) => {
    setIsUpdating(true);
    try {
      const response = await updateProviderRequest(id, updatedData);

      if (response.data?.success) {
        toast.success("Proveedor actualizado exitosamente");
        return response.data.provider;
      } else {
        toast.error("No se pudo actualizar el proveedor");
      }
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      if (error.response?.status === 404) {
        toast.error("Proveedor no encontrado");
      } else {
        toast.error("Error al actualizar proveedor. Intenta de nuevo.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProvider,
    isUpdating,
  };
};
