import { OAuthProviderConfig } from '../types';

// 创建OAuth配置的工厂函数
export function createOAuthConfig(provider: string, config: Partial<OAuthProviderConfig>): OAuthProviderConfig {
  const defaultConfig: Partial<OAuthProviderConfig> = {
    scope: [],
    state: Math.random().toString(36).substring(7)
  };

  // 合并默认配置和用户提供的配置
  return {
    ...defaultConfig,
    ...config,
    clientId: config.clientId || '',
    clientSecret: config.clientSecret || '',
    callbackUrl: config.callbackUrl || ''
  } as OAuthProviderConfig;
}