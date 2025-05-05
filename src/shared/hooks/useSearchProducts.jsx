import { useState } from "react";
import { searchProducts } from "../../services";
import toast from "react-hot-toast";

export const useSearchProductsByName = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (name) => {
    setIsLoading(true);
    try {
      const { success, products } = await searchProducts(name);
      if (success) setProducts(products);
      else toast.error("No se encontraron productos");
    } catch (error) {
      toast.error("Error al buscar productos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, search };
};
