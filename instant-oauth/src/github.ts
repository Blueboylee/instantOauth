import { OAuth } from '../index';
import { OAuthOptions, OAuthUserInfo, GithubUser } from '../types';

export class GithubOAuth extends OAuth {
  constructor(options: OAuthOptions) {
    super('github', options);
  }

  protected normalizeUserInfo(rawData: GithubUser): OAuthUserInfo {
    return {
      id: rawData.id.toString(),
      name: rawData.name || rawData.login,
      email: rawData.email || '',
      avatar: rawData.avatar_url || ''
    };
  }
}