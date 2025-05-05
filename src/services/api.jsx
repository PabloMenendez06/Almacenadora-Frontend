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

  export const getRecentProducts = async () => {
    try {
      const response = await apiClient.get('/product/recentEgresed');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos egresados recientemente:', error);
      throw error;
    }
  };
  
  export const getProductHistory = async () => {
    try {
      const response = await apiClient.get('/history/get-history');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el historial de productos:', error);
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
  
  export const withdrawProduct = async (id, data) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      const response = await apiClient.post(`/history/withdraw-product/${id}`, data, {
        headers: {
          "x-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al retirar producto:", error.response?.data || error.message);
      return {
        error: true,
        response: error.response,
      };
    }
  };

  export const registerProduct = async (id, data) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      const response = await apiClient.post(`/history/register-product/${id}`, data, {
        headers: {
          "x-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al registrar producto:", error.response?.data || error.message);
      return {
        error: true,
        response: error.response,
      };
    }
  };

  export const searchProducts = async (name) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      const response = await apiClient.get(`/product/search/${name}`, {
        headers: {
          "x-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar productos:", error.response?.data || error.message);
      return {
        error: true,
        response: error.response,
      };
    }
  };

  export const filterProducts = async (categoryName) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      const response = await apiClient.get(`/product/category/${categoryName}`, {
        headers: {
          "x-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al filtrar por categoría:", error.response?.data || error.message);
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

export const changePassword = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const token = user?.token;

    if (!userId || !token) {
      throw new Error("Usuario o token no encontrado en el localStorage");
    }

    const payload = {
      password: data.password,
      newPassword: data.newPassword,
    };

    console.log("Datos enviados:", payload);

    return await apiClient.put(`/user/editar/${userId}`, payload, {
      headers: {
        "x-token": token, 
      },
    });
  } catch (e) {
    return {
      error: true,
      message: e.message || "Error al cambiar la contraseña",
    };
  }
};

export const updateUser = async (data) => {
  try {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    console.log("ID del localStorage (updateUser):", userId);
    return await apiClient.put(`/user/editar/${userId}`, data)
  } catch (e) {
    return {
      error: true,
      message: e.message || "Error al actualizar el usuario",
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    console.log("ID del localStorage (updateUser):", userId);
    return await apiClient.put(`/user/delete/${userId}`, data)
  } catch (e) {
    return {
      error: true,
      message: e.message || "Error al actualizar el usuario",
    };
  }
};

const checkResponseStatus = (e) => {
    const responseStatus = e?.response.status

    if(responseStatus){
        (responseStatus === 401 || responseStatus === 403) && logout()
    }
}