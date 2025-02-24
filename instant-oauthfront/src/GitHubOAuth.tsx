import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import { useGitHubOAuth } from './GitHubOAuthProvider';

interface GitHubLoginButtonProps {
  className?: string;
}

const StyledGitHubButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const GitHubLoginButton = ({ className }: GitHubLoginButtonProps) => {
  const { login, isLoading } = useGitHubOAuth();
  
  const handleClick = () => {
    console.log('GitHub登录按钮被点击');
    login();
  };

  console.log('GitHubLoginButton渲染，当前状态:', { isLoading });

  return (
    <StyledGitHubButton
      fullWidth
      variant="outlined"
      startIcon={<GitHubIcon />}
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? '登录中...' : '使用GitHub登录'}
    </StyledGitHubButton>
  );
};