import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_ENDPOINTS, apiClient } from '@/lib/api';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  fullname: string;
}

interface Owner {
  id: string;
  email: string;
  fullname: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('isAdmin', String(isAdmin));
  }, [isAdmin]);

  const login = async (email: string, password: string) => {
    try {
      // For authentication endpoints, we need to include credentials
      const response = await apiClient.post(API_ENDPOINTS.USER_LOGIN, { email, password }, true);

      const data = await response.json();

      if (response.ok && data.user) {
        const userData = {
          id: data.user._id,
          email: data.user.email,
          fullname: data.user.fullname,
        };
        
        setUser(userData);
        setIsAdmin(false);
        
        // Store token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Network connection failed. Please check your internet connection and try again.');
        return { success: false, error: 'Network connection failed. Please check your internet connection and try again.' };
      }
      
      // Handle other errors
      toast.error('Login failed. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // For authentication endpoints, we need to include credentials
      const response = await apiClient.post(API_ENDPOINTS.USER_REGISTER, { fullname: name, email, password }, true);

      const data = await response.json();

      if (response.ok && data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
          fullname: data.user.fullname,
        };
        
        setUser(userData);
        setIsAdmin(false);
        
        // Store token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Signup failed' };
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Network connection failed. Please check your internet connection and try again.');
        return { success: false, error: 'Network connection failed. Please check your internet connection and try again.' };
      }
      
      // Handle other errors
      toast.error('Signup failed. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      // For authentication endpoints, we need to include credentials
      const response = await apiClient.post(API_ENDPOINTS.OWNER_LOGIN, { email, password }, true);

      const data = await response.json();

      if (response.ok && data.owner) {
        const ownerData = {
          id: data.owner._id,
          email: data.owner.email,
          fullname: data.owner.fullname,
        };
        
        setUser(ownerData);
        setIsAdmin(true);
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Admin login failed' };
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Network connection failed. Please check your internet connection and try again.');
        return { success: false, error: 'Network connection failed. Please check your internet connection and try again.' };
      }
      
      // Handle other errors
      toast.error('Admin login failed. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Determine which logout endpoint to call based on user type
      const logoutEndpoint = isAdmin 
        ? API_ENDPOINTS.OWNER_LOGOUT 
        : API_ENDPOINTS.USER_LOGOUT;
      
      // Call backend logout endpoint with credentials
      await apiClient.post(logoutEndpoint, undefined, true);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      // Clear local state regardless of backend call success
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, signup, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};