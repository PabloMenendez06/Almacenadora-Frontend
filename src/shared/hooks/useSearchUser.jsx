import { useState } from "react";
import { searchUsers } from "../../services";
import toast from "react-hot-toast";

export const useSearchUsersByName = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (name) => {
    setIsLoading(true);
    try {
      const { success, users } = await searchUsers(name);
      if (success) {
        setUsers(users);
      } else {
        toast.error("No se encontraron usuarios");
      }
    } catch (error) {
      toast.error("Error al buscar usuarios");
      console.error("searchUsers error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { users, isLoading, search };
};
