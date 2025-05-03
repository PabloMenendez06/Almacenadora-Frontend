import { useEffect } from "react";
import { Input } from './Input';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProvider, useUpdateProvider } from '../shared/hooks'; // Asegúrate de importar tu hook
import { providerSchema } from '../shared/validators';
import toast from "react-hot-toast";

export const CreateProvider = ({ providerToEdit, onClose }) => {
  const { createProvider: registerProvider, isLoading } = useCreateProvider();
  const { updateProvider, isUpdating } = useUpdateProvider(); // <== aquí está

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(providerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
  });

  useEffect(() => {
    if (providerToEdit) {
      reset({
        name: providerToEdit.name || "",
        email: providerToEdit.email || "",
        number: providerToEdit.number || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        number: "",
      });
    }
  }, [providerToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Datos a enviar:", data);
      if (providerToEdit) {
        await updateProvider(providerToEdit._id, data); 
      } else {
        await registerProvider(data.name, data.email, data.number);
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar proveedor:", error);
      toast.error("Error al procesar el proveedor.");
    }
  };
  

  return (
    <div className="register-container">
      <h1>{providerToEdit ? "Editar Proveedor" : "Registrar Proveedor"}</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          field="name"
          label="Nombre"
          {...register("name")}
          type="text"
          showErrorMessage={!!errors.name}
          validationMessage={errors.name?.message}
        />
        <Input
          field="email"
          label="Correo Electrónico"
          {...register("email")}
          type="email"
          showErrorMessage={!!errors.email}
          validationMessage={errors.email?.message}
        />
        <Input
          field="number"
          label="Número de Contacto"
          {...register("number")}
          type="text"
          showErrorMessage={!!errors.number}
          validationMessage={errors.number?.message}
        />
        <div className="button-group">
          <button type="submit" disabled={isLoading || isUpdating || !isValid}>
            {providerToEdit ? "Guardar Cambios" : "Crear"}
          </button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};
