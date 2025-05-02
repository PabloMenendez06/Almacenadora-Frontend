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

        if (response.error?.response?.status === 400) {
          toast.error("El proveedor ya existe.");
        } else {
          toast.error(response.error?.response?.data || 'Ocurrio un error al registrar el proveedor, intenta de nuevo');
        }
        return;
      }

      const { providerDetails } = response(name,email,number);

      localStorage.setItem('provider', JSON.stringify(providerDetails));

      toast.success('Proveedor registrado exitosamente');
      navigate('/provider');

    } catch (error) {
      setIsLoading(false);
      console.error("Error al registrar proveedor:", error); 
      toast.error("Error al registrar proveedor. Intenta de nuevo.");
    }
  };

  return {
    createProvider,
    isLoading
  };
};
