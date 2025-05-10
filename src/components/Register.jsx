import { Logo } from './Logo';
import { Input } from './Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '../shared/validators/AuthValidator'; 
import { useRegister } from '../shared/hooks';
import toast from "react-hot-toast";

export const Register = ({ switchAuthHandler }) => {
  const { register: registerUser, isLoading } = useRegister();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    try {
      registerUser(data.name,data.email, data.password, data.username);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Ya existe una cuenta con ese correo electrónico");
      } else {
        toast.error("Error al registrar. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="register-container">
      <Logo />
      <h1>Register Almacen</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
          field="name"
          label="Name"
          {...register("name")}
          type="text"
          showErrorMessage={!!errors.name}
          validationMessage={errors.name?.message}
        />
        <Input
          field="email"
          label="Email"
          {...register("email")}
          type="text"
          showErrorMessage={!!errors.email}
          validationMessage={errors.email?.message}
        />
        <Input
          field="username"
          label="Username"
          {...register("username")}
          type="text"
          showErrorMessage={!!errors.username}
          validationMessage={errors.username?.message}
        />
        <Input
          field="password"
          label="Password"
          {...register("password")}
          type="password"
          showErrorMessage={!!errors.password}
          validationMessage={errors.password?.message}
        />
        <Input
          field="passwordConfir"
          label="Password Confirmation"
          {...register("passwordConfir")}
          type="password"
          showErrorMessage={!!errors.passwordConfir}
          validationMessage={errors.passwordConfir?.message}
        />
        <button type="submit" disabled={isLoading || !isValid}>
          Register
        </button>
      </form>
      <span onClick={switchAuthHandler} className='auth-form-switch-label'>
        Already have an account? Sign up
      </span>
    </div>
  );
};
