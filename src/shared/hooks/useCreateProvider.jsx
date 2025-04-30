import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createProvider as createProviderRequest} from "../../services"
import toast from "react-hot-toast";

export const useCreateProvider = () =>{
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const createProvider = async (name, email, number) =>{
        setIsLoading(true)

        const response = await createProviderRequest({name, email, number})

        setIsLoading(false)

        if(response.error){
            return toast.error(response.error?.response?.data || 'Ocurrio un error al registrar el proveedor, intenta de nuevo')
        }

        const {providerDetails} = response.data

        localStorage.setItem('user', JSON.stringify(providerDetails));

        toast.success('Proveedor registrado exitosamente');

        navigate('/provider/')
    }

    return{
        createProvider,
        isLoading
    }
}
