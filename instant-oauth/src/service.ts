import axios from 'axios';
import { OAuthProviderConfig, OAuthUserInfo } from './types';

export class OAuthService {
  constructor(private config: OAuthProviderConfig) {}

  // 生成授权URL
  public getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.callbackUrl,
      ...(this.config.scope && { scope: this.config.scope.join(' ') }),
      ...(this.config.state && { state: this.config.state })
    });

    return `${this.config.authUrl}?${params.toString()}`;
  }

  // 使用授权码获取访问令牌
  public async getAccessToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code: code,
      redirect_uri: this.config.callbackUrl
    });

    const response = await axios.post(this.config.tokenUrl, params.toString(), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data.error) {
      throw new Error(`OAuth token error: ${response.data.error}`);
    }

    return response.data.access_token;
  }

  // 获取用户信息
  public async getUserInfo(accessToken: string): Promise<OAuthUserInfo> {
    const response = await axios.get(this.config.userInfoUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (response.data.error) {
      throw new Error(`Failed to get user info: ${response.data.error}`);
    }

    return this.normalizeUserInfo(response.data);
  }

  // 标准化用户信息
  private normalizeUserInfo(rawData: any): OAuthUserInfo {
    return {
      id: rawData.id?.toString() || '',
      name: rawData.name || rawData.login || '',
      email: rawData.email || '',
      avatar: rawData.avatar_url || ''
    };
  }

  // 验证状态值（防止CSRF攻击）
  public validateState(state: string): boolean {
    return this.config.state === state;
  }
}