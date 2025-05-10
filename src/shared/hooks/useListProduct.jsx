import { useState, useCallback, useEffect } from "react";
import { listProducts } from "../../services";
import toast from "react-hot-toast";

export const useListProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { success, products } = await listProducts();
      if (success) {
        setProducts(products);
      } else {
        toast.error("No se pudieron cargar los productos");
      }
    } catch (error) {
      toast.error("Error al cargar productos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, refetch: fetchProducts };
};
