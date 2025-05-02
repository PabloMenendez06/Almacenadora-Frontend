import { Input } from './Input';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProvider } from '../shared/hooks';
import { providerSchema } from '../shared/validators';
import toast from "react-hot-toast";

export const CreateProvider = () => {
  const { createProvider: registerProvider, isLoading } = useCreateProvider();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(providerSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    try {
      await registerProvider(data.name, data.email, data.number);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Ya existe un proveedor con ese correo electrónico");
      } else {
        toast.error("Error al registrar proveedor. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Registrar Proveedor</h1>
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
        <button type="submit" disabled={isLoading || !isValid}>
          Crear
        </button>
      </form>
    </div>
  );
};
