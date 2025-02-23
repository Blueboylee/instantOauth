import { useEffect } from 'react';

const GitHubCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && window.opener) {
      window.opener.postMessage({ type: 'github-oauth', code }, window.location.origin);
      console.log("GitHubCallback 10  window.location.origin:",  window.location.origin); // 应该是localhost:5173
      window.close();
    }
  }, []);


  return <div>GitHub 登录中，请稍等...</div>;
};

export default GitHubCallback;