import { useState, useEffect, useCallback } from "react";
import { getProductHistory } from "../../services";
import toast from "react-hot-toast";

export const useListHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, history } = await getProductHistory();
      if (success) {
        setHistory(history);
      } else {
        toast.error("No se pudo cargar el historial");
      }
    } catch (error) {
      toast.error("Error al cargar historial");
      console.error("Error al obtener historial:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    isLoading,
    refetch: fetchHistory,
  };
};
