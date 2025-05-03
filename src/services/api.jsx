import axios from "axios";
import { logout } from "../shared/hooks";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3333/storagePenguin/v1/',
    timeout: 5000
})

apiClient.interceptors.request.use(
  (config) => {
    const useUserDetails = localStorage.getItem('user');

    if (useUserDetails) {
      const token = JSON.parse(useUserDetails).token;
      config.headers['x-token'] = token; 
    }

    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

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
export const getCategories = async () => {
  try {
      const response = await apiClient.get('/category');
      return response.data;
  } catch (e) {
      checkResponseStatus(e);
      return { error: true, e };
  }
};

export const addCategory = async (categoryName) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token; 
  console.log(token);
  try {
      const response = await apiClient.post('/category', { name: categoryName });
      return response.data;
  } catch (e) {
      checkResponseStatus(e);  
      return { error: true, e };
  }
};


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
  export const createClient = async (clientData) => {
    try {
      const response = await apiClient.post('/client', clientData);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const listClients = async () => {
    try {
      const response = await apiClient.get('/client');
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const updateClient = async (id, clientData) => {
    try {
      const response = await apiClient.put(`/client/${id}`, clientData);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const deleteClient = async (id) => {
    try {
      const response = await apiClient.delete(`/client/${id}`);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };



const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status

  if(responseStatus){
      (responseStatus === 401 || responseStatus === 403) && logout()
  }

}