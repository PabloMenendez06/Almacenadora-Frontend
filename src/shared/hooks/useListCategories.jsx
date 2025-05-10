import { useState, useCallback, useEffect } from "react";
import { getCategories } from "../../services";
import toast from "react-hot-toast";

export const useListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, categories } = await getCategories();
      if (success) {
        setCategories(categories);
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
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, refetch: fetchCategories };
};
