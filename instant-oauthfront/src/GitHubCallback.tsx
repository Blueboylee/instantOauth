import { useEffect } from 'react';

const GitHubCallback = () => {
  useEffect(() => {
    console.log('GitHubCallback组件已加载');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('获取到GitHub回调参数:', { code, search: window.location.search });

    if (code && window.opener) {
      console.log('准备向父窗口发送OAuth消息');
      window.opener.postMessage({ type: 'github-oauth', code }, window.location.origin);
      console.log('已发送OAuth消息到父窗口，origin:', window.location.origin);
      window.close();
    } else {
      console.log('回调处理失败:', { hasCode: !!code, hasOpener: !!window.opener });
    }
  }, []);

  return <div>GitHub 登录中，请稍等...</div>;
};

export default GitHubCallback;