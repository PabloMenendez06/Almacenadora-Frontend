import { useState, useCallback, useEffect } from "react";
import { listProviders } from "../../services";
import toast from "react-hot-toast";

export const useListProviders = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, providers } = await listProviders();
      if (success) {
        setProviders(providers);
      } else {
        toast.error("No se pudieron cargar los proveedores");
      }
    } catch (error) {
      toast.error("Error al cargar proveedores");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return { providers, isLoading, refetch: fetchProviders };
};
