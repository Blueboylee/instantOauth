import React, { createContext, useContext, useState } from 'react';
import { GitHubOAuthContextType, GitHubOAuthProviderProps } from './types';

const GitHubOAuthContext = createContext<GitHubOAuthContextType | null>(null);

export const GitHubOAuthProvider = ({ config, children }: GitHubOAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const handleCallback = async (code: string) => {
    console.log('开始处理GitHub OAuth回调，code:', code);
    try {
      setIsLoading(true);
      setError(null);
      const callbackPath = config.callbackPath || '/api/auth/github/callback';
      console.log('准备发送认证请求到:', `${config.apiBaseUrl}${callbackPath}`);
      const response = await fetch(`${config.apiBaseUrl}${callbackPath}?code=${code}`);
      const data = await response.json();
      console.log('收到认证响应:', { hasToken: !!data.token, hasUser: !!data.user });
      if (data.token && data.user) {
        setUser(data.user);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('认证成功，用户信息已保存');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('GitHub认证失败:', error);
      setError('GitHub登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    console.log('开始GitHub登录流程');
    const authUrl = config.authUrl || 'https://github.com/login/oauth/authorize';
    const scope = config.scope || 'user:email';
    const githubAuthUrl = `${authUrl}?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUrl)}&scope=${scope}`;
    console.log('GitHub授权URL:', githubAuthUrl);
    const authWindow = window.open(githubAuthUrl, '_blank', 'width=600,height=700');

    if (authWindow) {
      console.log('已打开GitHub授权窗口');
      window.addEventListener('message', async (event) => {
        console.log('收到postMessage事件:', event.origin);
        if (event.origin !== new URL(config.redirectUrl).origin) {
          console.log('忽略来自未知来源的消息:', event.origin);
          return;
        }

        if (event.data.type === 'github-oauth') {
          console.log('收到GitHub OAuth消息');
          handleCallback(event.data.code);
        }
      }, { once: true });
    }
  };

  const logout = () => {
    console.log('执行登出操作');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('用户信息已清除');
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
