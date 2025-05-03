import { useState } from "react";
import { filterProductsByCategoryRequest } from "../../services";

export const useFilterProductsByCategory = () => {
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filter = async (categoryName) => {
    setIsLoading(true);
    const response = await filterProductsByCategoryRequest(categoryName);
    setIsLoading(false);

    if (!response.error) {
      setFiltered(response.products || []);
    }
  };

  return { filter, filtered, isLoading };
};
