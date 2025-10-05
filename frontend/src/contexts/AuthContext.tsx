import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
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
    // Mock login - in real app, this would call your API
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    setUser(mockUser);
    setIsAdmin(false);
    return true;
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in real app, this would call your API
    const mockUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    setUser(mockUser);
    setIsAdmin(false);
    return true;
  };

  const adminLogin = async (email: string, password: string) => {
    // Mock admin login - in real app, validate against backend
    if (email === 'admin@shop.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        email,
        name: 'Admin',
      };
      setUser(adminUser);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
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
