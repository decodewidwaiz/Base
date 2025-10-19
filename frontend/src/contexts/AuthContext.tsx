import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
      const response = await fetch('https://base-nu-six.vercel.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });

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
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('https://base-nu-six.vercel.app/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname: name, email, password }),
      });

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
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('https://base-nu-six.vercel.app/owner/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });

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
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      // Determine which logout endpoint to call based on user type
      const logoutEndpoint = isAdmin 
        ? '/owner/logout' 
        : 'https://base-nu-six.vercel.app/user/logout';
      
      // Call backend logout endpoint
      await fetch(logoutEndpoint, {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
    } catch (error) {
      console.error('Logout error:', error);
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