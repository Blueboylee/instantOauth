# React GitHub OAuth

一个简单易用的React组件库，用于实现GitHub OAuth认证功能。

## 安装

```bash
npm install @blog-app/react-github-oauth

# 或者使用yarn
yarn add @blog-app/react-github-oauth
```

## 使用方法

1. 在应用根组件中配置GitHubOAuthProvider：

```jsx
import { GitHubOAuthProvider } from '@blog-app/react-github-oauth';

const githubOAuthConfig = {
  clientId: 'your-github-client-id',
  clientSecret: 'your-github-client-secret',
  redirectUrl: 'http://your-domain/github/callback',
  apiBaseUrl: 'http://your-api-domain'
};

function App() {
  return (
    <GitHubOAuthProvider config={githubOAuthConfig}>
      {/* 你的应用组件 */}
    </GitHubOAuthProvider>
  );
}
```

2. 在需要GitHub登录的组件中使用GitHubLoginButton：

```jsx
import { GitHubLoginButton } from '@blog-app/react-github-oauth';

function LoginPage() {
  return (
    <div>
      <GitHubLoginButton />
    </div>
  );
}
```

3. 添加回调页面组件：

```jsx
import { GitHubCallback } from '@blog-app/react-github-oauth';

// 在路由中添加
<Route path="/github/callback" element={<GitHubCallback />} />
```

## API

### GitHubOAuthConfig

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| clientId | string | 是 | GitHub OAuth App的客户端ID |
| clientSecret | string | 是 | GitHub OAuth App的客户端密钥 |
| redirectUrl | string | 是 | 认证回调地址 |
| apiBaseUrl | string | 是 | 后端API地址 |
| authUrl | string | 否 | GitHub认证URL，默认为官方地址 |
| callbackPath | string | 否 | 后端回调接口路径 |
| scope | string | 否 | OAuth权限范围 |

### GitHubLoginButton Props

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| className | string | 否 | 自定义样式类名 |

## 许可证

MIT