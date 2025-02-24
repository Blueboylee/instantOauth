import { NavigateFunction } from 'react-router-dom';
export interface GitHubOAuthConfig {
  clientId: string;
  redirectUrl: string;
  apiBaseUrl: string;
  authUrl?: string;
  callbackPath?: string;
  scope?: string;
}

export interface GitHubOAuthContextType {
  isLoading: boolean;
  error: string | null;
  user: any | null;
  login: () => void;
  logout: () => void;
}

export interface GitHubOAuthProviderProps {
  config: GitHubOAuthConfig;
  children: React.ReactNode;
  navigate: NavigateFunction;
}

export interface GitHubLoginButtonProps {
  className?: string;
}