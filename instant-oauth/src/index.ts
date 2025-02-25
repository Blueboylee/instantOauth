import { OAuthService } from './service';
import type { OAuthOptions, OAuthUserInfo, AuthResponse, OAuthProviderConfig } from './types';

export class OAuth {
  private service: OAuthService;

  constructor(provider: 'github', options: OAuthOptions) {
    const config: OAuthProviderConfig = {
      ...options,
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userInfoUrl: 'https://api.github.com/user',
      authUrl: 'https://github.com/login/oauth/authorize'
    };
    this.service = new OAuthService(config);
  }

  /**
   * 完成OAuth认证流程
   * @param code 从OAuth回调中获取的授权码
   * @returns 用户信息
   */
  public async authenticate(code: string): Promise<OAuthUserInfo> {
    try {
      const accessToken = await this.service.getAccessToken(code);
      return await this.service.getUserInfo(accessToken);
    } catch (error) {
      throw new Error(`认证失败: ${error}`);
    }
  }

  /**
   * 获取OAuth授权URL
   * @returns 授权URL
   */
  public getAuthUrl(): string {
    return this.service.getAuthorizationUrl();
  }
}

// 导出类型定义
export type { OAuthOptions, OAuthUserInfo, AuthResponse, OAuthProviderConfig };