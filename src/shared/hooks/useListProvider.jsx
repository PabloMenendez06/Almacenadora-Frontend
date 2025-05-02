import { useState, useEffect } from "react";
import { listProviders as listProvidersRequest } from "../../services"; // Esta es la función para hacer la solicitud al backend
import toast from "react-hot-toast";

export const useListProviders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);

      try {
        const response = await listProvidersRequest(); 

        setIsLoading(false);

        if (response.error) {
          toast.error(response.error?.response?.data || 'Ocurrio un error al obtener la lista de proveedores');
          return;
        }

        setProviders(response.data.providers);

      } catch (error) {
        setIsLoading(false);
        toast.error("Error al obtener la lista de proveedores. Intenta de nuevo.");
      }
    };

    fetchProviders();
  }, []);

  return {
    isLoading,
    providers,
  };
};
