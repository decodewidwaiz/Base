// API configuration file
const API_BASE_URL = 'https://base-nine-sage.vercel.app';

export const API_ENDPOINTS = {
  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_REGISTER: `${API_BASE_URL}/user/register`,
  USER_LOGOUT: `${API_BASE_URL}/user/logout`,
  USER_CART: `${API_BASE_URL}/user/cart`,
  USER_ADDRESS: `${API_BASE_URL}/user/address`,
  USER_ADD_TO_CART: (productId: string) => `${API_BASE_URL}/user/addtocart/${productId}`,
  USER_REMOVE_FROM_CART: (productId: string) => `${API_BASE_URL}/user/cart/${productId}`,
  
  // Owner endpoints
  OWNER_LOGIN: `${API_BASE_URL}/owner/login`,
  OWNER_REGISTER: `${API_BASE_URL}/owner/register`,
  OWNER_LOGOUT: `${API_BASE_URL}/owner/logout`,
  
  // Product endpoints
  PRODUCTS_SHOP: `${API_BASE_URL}/product/shop`,
  PRODUCT_DETAILS: (id: string) => `${API_BASE_URL}/product/product/${id}`,
  PRODUCT_CREATE: `${API_BASE_URL}/product/createproduct`,
  PRODUCT_UPDATE: (id: string) => `${API_BASE_URL}/product/updateproduct/${id}`,
  PRODUCT_DELETE: (id: string) => `${API_BASE_URL}/product/deleteproduct/${id}`,
};

export const apiClient = {
  get: async (url: string, includeCredentials: boolean = false) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: includeCredentials ? 'include' : 'omit',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  },
  
  post: async (url: string, data?: any, includeCredentials: boolean = false, isFormData: boolean = false) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: isFormData ? {} : {
          'Content-Type': 'application/json',
        },
        body: isFormData ? data : JSON.stringify(data),
        credentials: includeCredentials ? 'include' : 'omit',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  },
  
  put: async (url: string, data?: any, includeCredentials: boolean = false) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: includeCredentials ? 'include' : 'omit',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  },
  
  delete: async (url: string, includeCredentials: boolean = false) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: includeCredentials ? 'include' : 'omit',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, error);
      throw error;
    }
  },
};