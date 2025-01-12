import { Typography } from '@mui/material';

const AuthToggle = ({ isLogin, handleToggle }) => {
    return (
        <Typography
            variant="body2"
            sx={{
                mt: 2,
                color: 'primary.main',
                cursor: 'pointer',
                textDecoration: 'underline',
            }}
            onClick={handleToggle}
        >
            {isLogin
                ? "Don't have an account? Register here."
                : 'Already have an account? Login here.'}
        </Typography>
    );
};

export default AuthToggle;
