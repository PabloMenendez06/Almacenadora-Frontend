import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {updateProvider as updateProductRequest } from "../../services";
import toast from "react-hot-toast";

export const useUpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateProduct = async (id, productData) => {
    setIsLoading(true);
    try {
      const response = await updateProductRequest(id, productData);
      setIsLoading(false);

      if (response.error) {
        const status = response.response?.status;
        if (status === 404) {
          toast.error("Producto no encontrado");
        } else {
          toast.error(response.response?.data?.message || "Error al actualizar el producto.");
        }
        return;
      }

       localStorage.setItem("product", JSON.stringify(response.product));

      toast.success("Producto actualizado exitosamente");
      navigate("/product"); 
    } catch (error) {
      setIsLoading(false);
      console.error("Error al actualizar producto:", error?.response || error);
      toast.error(error?.response?.data?.message || "Ocurrió un error al actualizar el producto.");
    }
  };

  return { updateProduct, isLoading };
};
