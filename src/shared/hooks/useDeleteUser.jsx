import { useState } from "react";
import { deleteUser as deleteUserService } from "../../services";
import toast from "react-hot-toast";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async ({ userId, password }) => {
    try {
      setLoading(true);
      const res = await deleteUserService(userId, { password });

      if (res?.data?.success) {
        toast.success("Usuario desactivado correctamente");
        return res.data.user;
      } else {
        toast.error(res?.data?.msg || "No se pudo desactivar");
        throw new Error(res?.data?.msg || "Error desconocido");
      }
    } catch (error) {
      toast.error(error.message || "Error al desactivar el usuario");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
  };
};
