import axios from "axios";
import { logout } from "../shared/hooks";

  const apiClient = axios.create({
      baseURL: 'http://localhost:3333/almacenadoraSystem/v1/',
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

export const login = async (data) => {
    try {
        return await apiClient.post('auth/login', data)
    } catch (e) {
        return { error: true, e }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('auth/register', data)
    } catch (e) {
        return { error: true, e }
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
  try {
      const response = await apiClient.post('/category', { name: categoryName });
      return response.data;
  } catch (e) {
      checkResponseStatus(e);  
      return { error: true, e };
  }
};

export const createProvider = async data => {
  const token = JSON.parse(localStorage.getItem('user'))?.token; 
  try {
      const response = await apiClient.post('/provider', data, {
        headers: {
            'x-token': token,
        },
    });
      return response.data;
  } catch (error) {
    return { error: true, response: error.response };
  }
};

export const createProduct = async data => {
  const token = JSON.parse(localStorage.getItem('user'))?.token; 
  try {
      const response = await apiClient.post('/product', data, {
        headers: {
            'x-token': token,
        },
    });
      return response.data;
  } catch (error) {
    return { error: true, response: error.response };
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
  try {
    const response = await apiClient.put(`/provider/${id}`, data, {
      headers: {
        "x-token": token,
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, response: error.response };
  }
};

export const updateProduct = async (id, productData) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await apiClient.put(`/product/${id}`, productData, {
      headers: {
        "x-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error.response.data);
    return { error: true, response: error.response };
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
    return { error: true, response: error.response };
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
    return { error: true, response: error.response };
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
    return { error: true, response: error.response };
  }
};

export const searchUsers = async (name) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await apiClient.get("/user/search", {
      params: { username: name }, 
      headers: {
        "x-token": token, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error al buscar user:", error.response?.data || error.message);
    return { error: true, response: error.response };
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
    return { error: true, response: error.response };
  }
};

export const deleteProvider = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await apiClient.delete(`/provider/${id}`, {
      headers: {
        'x-token': token,
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, response: error.response };
  }
};
export const deleteUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await apiClient.delete(`/user/eliminar/${id}`, {
      headers: {
        'x-token': token,
      },
    });
    return response;
  } catch (error) {
    return { error: true, response: error.response };
  }
};
export const deleteProduct = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  try {
    const response = await apiClient.delete(`/product/${id}`, {
      headers: {
        'x-token': token,
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, response: error.response };
  }
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

export const updateUser = async (data) => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = currentUser?.token;
    const isAdmin = currentUser?.role === "ADMIN";

    const userIdToUpdate = data._id || data.uid || currentUser?._id;

    if (!isAdmin && data.role) {
      delete data.role;
    }

    return await apiClient.put(
      `/user/editar/${userIdToUpdate}`,
      data,
      {
        headers: {
          'x-token': token,
        },
      }
    );
  } catch (e) {
    return { error: true, e };
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

    return await apiClient.put(`/user/editar/${userId}`, payload, {
      headers: {
        "x-token": token, 
      },
    });
  } catch (e) {
    return { error: true, message: e.message || "Error al cambiar la contraseña" };
  }
};

const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status;
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};