import axios from "axios";
import { logout } from "../shared/hooks";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3333/storagePenguin/v1/',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user')

        if(useUserDetails){
            const token = JSON.parse(useUserDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async(data) => {
    try {
        return await apiClient.post('auth/login', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const register = async(data) => {
    try {
        return await apiClient.post('auth/register', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const createProvider = async (name,email,number) => {
    try {
        const response = await apiClient.post('/provider', {name:name,email:email,number:number},{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response.data;
    } catch (error) {
      return {
        error: true,
        response: error.response, 
      };
    }
  };

  export const listProviders = async () => {
    try {
      const response = await apiClient.get('/provider');  
      return response.data;
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      throw error; 
    }
  };
  
  export const updateProvider = async(id, data) => {
    return await apiClient.put(`/provider/${id}`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  };

  export const deleteProvider = async(id) => {
    return await apiClient.delete(`/provider/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  };



const checkResponseStatus = (e) => {
    const responseStatus = e?.response.status

    if(responseStatus){
        (responseStatus === 401 || responseStatus === 403) && logout()
    }
}