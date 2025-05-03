import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProvider as createProviderRequest } from "../../services";
import toast from "react-hot-toast";

export const useCreateProvider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createProvider = async (name, email, number) => {
    setIsLoading(true);
    try {
      const response = await createProviderRequest({ name, email, number });
      setIsLoading(false);
      if (response.error) {
        if (response.response?.status === 409) {
          toast.error("Ya existe un proveedor con ese correo electrónico");
        } else {
          toast.error("Error al registrar proveedor");
        }
        return;
      }
      const { providerDetails } = response;
      localStorage.setItem("provider", JSON.stringify(providerDetails));
      toast.success("Proveedor registrado exitosamente");
      navigate("/provider");
    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar proveedor:", error?.response || error);
      toast.error(error?.response?.data?.message || "Error al registrar proveedor.");
    }
  };

  return {
    createProvider,
    isLoading
  };
};
