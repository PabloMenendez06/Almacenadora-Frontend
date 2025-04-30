import { Logo } from './Logo';
import { Input } from './Input';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../shared/validators'; 
import { useLogin } from '../shared/hooks';

export const Login = ({ switchAuthHandler }) => {
  const { login, isLoading } = useLogin();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    try {
      login(data.email, data.password);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Correo o contraseña incorrectos");
      } else {
        toast.error("Error al iniciar sesión. Intenta más tarde.");
      }
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <h1>Register Almacen</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        field="email"
        label="Email"
        {...register("email")}
        type="text"
        showErrorMessage={!!errors.email}
        validationMessage={errors.email?.message}
      />

      <Input
        field="password"
        label="Password"
        {...register("password")}
        type="password"
        showErrorMessage={!!errors.password}
        validationMessage={errors.password?.message}
      />
        <button type="submit" disabled={isLoading || !isValid}>
          Login
        </button>
      </form>
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Don't have an account? Sign up
      </span>
    </div>
  );
};
