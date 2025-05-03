// src/shared/hooks/useCreateCategory.js
import { useState } from "react";
import toast from "react-hot-toast";
import { addCategory } from "../../services/api";

export const useCreateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async (name) => {
    setIsLoading(true);
    try {
      const response = await addCategory(name); // Envía solo el nombre

      setIsLoading(false);

      if (response.error) {
        toast.error("Error al agregar la categoría.");
        return null;
      }

      toast.success("Categoría creada exitosamente");
      return response; // Devuelve los datos para agregarlos a la lista
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      toast.error("Error al crear la categoría.");
      setIsLoading(false);
      return null;
    }
  };

  return {
    createCategory,
    isLoading,
  };
};
