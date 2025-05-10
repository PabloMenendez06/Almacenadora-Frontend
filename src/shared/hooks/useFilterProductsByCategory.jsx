import { useState } from "react";
import { filterProducts } from "../../services";
import toast from "react-hot-toast";

export const useFilterProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filter = async (categoryName) => {
    setIsLoading(true);
    try {
      const { success, products } = await filterProducts(categoryName);
      if (success) setProducts(products);
      else toast.error(`No se encontraron productos para la categoría: ${categoryName}`);
    } catch (error) {
      toast.error("Error al filtrar productos por categoría");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, filter };
};
