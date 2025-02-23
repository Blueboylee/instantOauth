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
  return (
    <StyledGitHubButton
      fullWidth
      variant="outlined"
      startIcon={<GitHubIcon />}
      onClick={login}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? '登录中...' : '使用GitHub登录'}
    </StyledGitHubButton>
  );
};