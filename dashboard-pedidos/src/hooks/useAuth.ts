import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem('auth_token', 'fake-token-123');
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const register = () => {
    // Aqui você faria a chamada real para sua API
    localStorage.setItem('auth_token', 'fake-token-123');
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return { isAuthenticated, isLoading, login, register, logout };
};
