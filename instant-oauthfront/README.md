# React GitHub OAuth

一个简单易用的React组件库，用于实现GitHub OAuth认证功能。

## 安装

```bash
npm install instant-oauthfront

# 或者使用yarn
yarn add instant-oauthfront
```

## 使用方法

1. 在应用根组件中配置GitHubOAuthProvider：

```jsx
import { GitHubOAuthProvider } from ' instant-oauthfront';

const githubOAuthConfig = {
  clientId: 'your-github-client-id',
  clientSecret: 'your-github-client-secret',
  redirectUrl: 'http://your-domain/github/callback', 
  apiBaseUrl: 'http://your-api-domain',
  authUrl: 'https://github.com/login/oauth/authorize',  // 可选，GitHub认证URL
  callbackPath: '/api/auth/github/callback',  // 可选，后端回调接口路径
  scope: 'user:email'  // 可选，OAuth权限范围
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
import { GitHubLoginButton } from 'instant-oauthfront';

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
import { GitHubCallback } from 'instant-oauthfront';

// 在路由中添加
<Route path="/github/callback" element={<GitHubCallback />} />
```

## API

### GitHubOAuthConfig

#### 基本配置（必填）

| 参数 | 类型 | 说明 |
|------|------|------|
| clientId | string | GitHub OAuth App的客户端ID，可在GitHub开发者设置中找到 |
| clientSecret | string | GitHub OAuth App的客户端密钥 |
| redirectUrl | string | GitHub登录成功后跳转回前端的URL（需要在GitHub应用设置中添加） |
| apiBaseUrl | string | 后端API地址，前端会请求此地址交换token |

#### 可选配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| authUrl | string | https://github.com/login/oauth/authorize | GitHub的授权URL，通常不用改，除非GitHub API发生变更 |
| callbackPath | string | /api/auth/github/callback | 自定义后端回调路径，例如完整URL会是：http://localhost:3000/api/auth/github/callback |
| scope | string | user:email | GitHub授权范围，常用值：<br>- `user:email`：读取用户邮箱<br>- `read:user`：读取用户信息<br>- `repo`：访问私有仓库<br>- `read:org`：组织信息 |

### GitHubLoginButton Props

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| className | string | 否 | 自定义样式类名 |

# 具体的例子
### 在路由界面
```
import { GitHubOAuthProvider, GitHubCallback } from 'instant-oauthfront';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

// GitHub OAuth 配置
const githubOAuthConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
  redirectUrl: 'http://localhost:5173/github/callback',
  apiBaseUrl: 'http://localhost:3000', // 后端 API 地址
};

function App() {
  return (
    <Router>
      <GitHubOAuthProvider config={githubOAuthConfig}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/github/callback" element={<GitHubCallback />} />
        </Routes>
      </GitHubOAuthProvider>
    </Router>
  );
}

export default App;

```
### 登录界面
login.tsx中
```
import { Button } from '@mui/material';
import { useGitHubOAuth } from 'instant-oauthfront';

const Login = () => {
  const { login, isLoading } = useGitHubOAuth();

  // 点击按钮触发 GitHub OAuth 登录
  //放在你想展示github登录的地方
  return (
    <Button variant="contained" onClick={login} disabled={isLoading}>
      使用 GitHub 登录
    </Button>
  );
};

export default Login;

```

## 许可证

MIT