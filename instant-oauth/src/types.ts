export interface OAuthProviderConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  scope?: string[];
  authUrl?: string;
  state?: string;
}

export interface OAuthUserInfo {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  [key: string]: any;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface OAuthOptions {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope?: string[];
}

export interface AuthResponse {
  token: string;
  user: OAuthUserInfo;
}

export interface GithubUser {
  id: number;
  login: string;
  name?: string;
  email?: string;
  avatar_url?: string;
}