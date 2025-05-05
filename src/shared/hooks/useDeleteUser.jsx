import { useState } from "react";
import { deleteUser as deleteUserService } from "../../services"; // ajusta el path

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async ({ password }) => {
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
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
