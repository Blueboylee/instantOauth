import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitHubOAuthContextType, GitHubOAuthProviderProps } from './types';

const GitHubOAuthContext = createContext<GitHubOAuthContextType | null>(null);

export const GitHubOAuthProvider: React.FC<GitHubOAuthProviderProps> = ({ config, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleCallback = async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const callbackPath = config.callbackPath || '/api/auth/github/callback';
      const response = await fetch(`${config.apiBaseUrl}${callbackPath}?code=${code}`);
      const data = await response.json();
      if (data.token && data.user) {
        setUser(data.user);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      }
    } catch (error) {
      console.error('GitHub认证失败:', error);
      setError('GitHub登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    const authUrl = config.authUrl || 'https://github.com/login/oauth/authorize';
    const scope = config.scope || 'user:email';
    const githubAuthUrl = `${authUrl}?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUrl)}&scope=${scope}`;
    const authWindow = window.open(githubAuthUrl, '_blank', 'width=600,height=700');

    if (authWindow) {
      window.addEventListener('message', async (event) => {
        if (event.origin !== new URL(config.redirectUrl).origin) return;

        if (event.data.type === 'github-oauth') {
          handleCallback(event.data.code);
        }
      }, { once: true });
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <GitHubOAuthContext.Provider value={{ isLoading, error, user, login, logout }}>
      {children}
    </GitHubOAuthContext.Provider>
  );
};

export const useGitHubOAuth = () => {
  const context = useContext(GitHubOAuthContext);
  if (!context) {
    throw new Error('useGitHubOAuth must be used within a GitHubOAuthProvider');
  }
  return context;
};