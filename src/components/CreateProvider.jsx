import { yupResolver } from '@hookform/resolvers/yup';
import {useCreateProvider} from '../shared/hooks'

export const CreateProvider = ({ switchProviderHandler}) =>{
    const {createProvider: registerProvider, isLoading  } = useCreateProvider();

    const{ createProvider, handleSubmit, fromState: {erros, isValid}} = useForm({
        resolver: yupResolver(registerProviderSchema),
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        try {
            registerProvider(data.name,data.email, data.numero);
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("Ya existe una proveedor con ese correo electrónico");
              } else {
                toast.error("Error al registrar Proveedro. Intenta de nuevo.");
              }
        }
    }
}