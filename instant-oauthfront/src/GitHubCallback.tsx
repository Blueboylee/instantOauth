import { useEffect } from 'react';

const GitHubCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && window.opener) {
      window.opener.postMessage({ type: 'github-oauth', code }, window.location.origin);
      window.close();
    }
  }, []);

  return <div>GitHub 登录中，请稍等...</div>;
};

export default GitHubCallback;