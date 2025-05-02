import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import toast from "react-hot-toast";
import { useUserDetails } from "../hooks/useUserDetails"; 

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setUserDetails } = useUserDetails(); 

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await loginRequest({ email, password });
      const { userDetails } = response.data;

      localStorage.setItem("user", JSON.stringify(userDetails));

      if (setUserDetails) {
        setUserDetails(userDetails);
      }

      toast.success("Sesión iniciada correctamente");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.msg || "Ocurrió un error al iniciar sesión, intenta de nuevo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
