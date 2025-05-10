import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUser } from "../../services";

export const useUserSettings = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userSettings, setUserSettings] = useState(null);

  const fetchUserSettings = () => {
    if (!storedUser) {
      toast.error("No se encontró información del usuario en el almacenamiento local");
      return;
    }

    setUserSettings({
      username: storedUser.username || "",
      name: storedUser.name || ""
    });
  };

  const saveSettings = async (data) => {
    const response = await updateUser(data);

    if (response.error) {
      return toast.error(
        response.e?.response?.data || 'Ocurrió un error al actualizar los datos del usuario'
      );
    }

    localStorage.setItem("user", JSON.stringify({
      ...storedUser,
      ...data
    }));

    toast.success('Información del usuario actualizada correctamente');
    setUserSettings(data);
  };

  useEffect(() => {
    fetchUserSettings();
  }, []);

  return {
    isFetching: !userSettings,
    userSettings,
    saveSettings
  };
};
