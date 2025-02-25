import { Router } from 'express';
import { OAuth } from '.';
export { OAuth };

export function createOAuthRouter(provider: 'github', options: {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope?: string[];
}) {
  const router = Router();
  const oauth = new OAuth(provider, options);

  router.get(`/auth/${provider}/callback`, async (req:any, res:any) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: '缺少授权码' });
    }

    try {
      const result = await oauth.authenticate(code);
      res.json(result);
    } catch (error) {
      console.error(`${provider}认证错误:`, error);
      res.status(500).json({ error: `${provider}认证失败` });
    }
  });

  return router;
}