import axios from "axios";
import { logout } from "../shared/hooks";

const apiClient = axios.create({
    baseURL: 'http://localhost:3333/storagePenguin/v1/',
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
export const getCategories = async () => {
  try {
      const response = await apiClient.get('/category');
      return response.data;
  } catch (e) {
      checkResponseStatus(e);
      return { error: true, e };
  }
};
export const createProvider = async data => {
  const token = JSON.parse(localStorage.getItem('user'))?.token; 
  console.log("Token:",token);
    try {
        const response = await apiClient.post('/provider', data,{
          headers: {
              'x-token': token, 
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

  export const createProduct = async data => {
    const token = JSON.parse(localStorage.getItem('user'))?.token; 
    console.log("Token:",token);
      try {
          const response = await apiClient.post('/product', data,{
            headers: {
                'x-token': token, 
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
  
  export const listProducts = async () => {
    try {
      const response = await apiClient.get('/product');  
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error; 
    }
  };
  
  export const updateProvider = async (id, data) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("Token:", token);
    try {
      const response = await apiClient.put(`/provider/${id}`, data, {
        headers: {
          "x-token": token,
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
  
  export const updateProduct = async (id, productData) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("Token:", token);
    try {
      const response = await apiClient.put(`/product/${id}`, productData, {
        headers: {
          "x-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el producto:", error.response.data);
      return {
        error: true,
        response: error.response,
      };
    }    
  };
  
  export const deleteProvider = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("Token:", token);
    try {
      const response = await apiClient.delete(`/provider/${id}`, {
        headers: {
          'x-token': token,
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

  export const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("Token:", token);
    try {
      const response = await apiClient.delete(`/product/${id}`, {
        headers: {
          'x-token': token,
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

const checkResponseStatus = (e) => {
    const responseStatus = e?.response.status

    if(responseStatus){
        (responseStatus === 401 || responseStatus === 403) && logout()
    }
}