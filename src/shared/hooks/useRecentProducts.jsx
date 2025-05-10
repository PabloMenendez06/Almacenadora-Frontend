import { useState, useEffect, useCallback } from "react";
import { getRecentProducts } from "../../services";
import toast from "react-hot-toast";

export const useRecentProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecent = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, products } = await getRecentProducts();
      if (success) setProducts(products);
      else toast.error("No se pudieron obtener los productos recientes");
    } catch (error) {
      toast.error("Error al obtener productos recientes");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return { products, isLoading, refetch: fetchRecent };
};
