import { useState } from "react";
import { updateUser as updateUserService } from "../../services"; 
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);

  const updateUser = async (data) => {
    try {
      setLoading(true);
      console.log("Datos que se envían al backend:", data); 

      const res = await updateUserService(data);

      if (res?.data?.success) {
        toast.success("Usuario actualizado correctamente");
        return res.data.user;
      } else {
        toast.error(res?.data?.msg || "No se pudo actualizar");
        throw new Error(res?.data?.msg || "Error desconocido");
      }
    } catch (error) {
      toast.error(error.message || "Error al actualizar el usuario");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
  };
};

