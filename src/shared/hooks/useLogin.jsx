import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginRequest } from "../../services"; // Para hacer la solicitud al backend

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      // Realizamos la solicitud de login al backend
      const response = await loginRequest({ email, password });

      // Ahora accedemos al token desde userDetails
      const { userDetails } = response.data;
      const { token } = userDetails;

      if (userDetails && token) {
        const userData = { ...userDetails, token };

        // Guardamos el usuario y el token en localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Sesión iniciada correctamente");
        navigate("/");  // Redirigimos al home
      } else {
        throw new Error("Error al obtener datos del usuario.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.msg || "Ocurrió un error al iniciar sesión, intenta de nuevo"
      );
    } finally {
      setIsLoading(false);  // Detenemos el estado de carga
    }
  };

  return {
    login,
    isLoading,
  };
};
