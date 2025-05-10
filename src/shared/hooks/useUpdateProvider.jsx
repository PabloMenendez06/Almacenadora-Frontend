import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProvider as updateProviderRequest } from "../../services";
import toast from "react-hot-toast";

export const useUpdateProvider = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const updateProvider = async (id, updatedData) => {
    setIsUpdating(true);
    try {
      const response = await updateProviderRequest(id, updatedData);
      setIsUpdating(false);

      if (response.error) {
        if (response.response?.status === 404) {
          toast.error("Proveedor no encontrado");
        } else {
          toast.error("Error al actualizar proveedor");
        }
        return;
      }

      const { provider } = response;
      localStorage.setItem("provider", JSON.stringify(provider));
      toast.success("Proveedor actualizado exitosamente");
      navigate("/provider");
    } catch (error) {
      setIsUpdating(false);
      console.error("Error al actualizar proveedor:", error?.response || error);
      toast.error(error?.response?.data?.message || "Error al actualizar proveedor.");
    }
  };

  return {
    updateProvider,
    isUpdating
  };
};
