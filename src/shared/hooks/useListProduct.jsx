import { useEffect, useState } from "react";
import { listProductsRequest } from "../../services";

export const useListProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await listProductsRequest();
      setIsLoading(false);

      if (!response.error) {
        setProducts(response.products || []);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
};
