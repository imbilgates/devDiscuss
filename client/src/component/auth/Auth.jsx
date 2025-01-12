import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useAuth } from '../../contex/AuthContex';
import Login from './Login';
import Register from './Register';
import AuthToggle from './AuthToggle';
import ErrorMessage from './ErrorMessage';
import Message from './Message';
import GoogleLoginAuth from './GoogleLoginAuth';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { setIsAuth } = useAuth();

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setError('');
        setMessage('');
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ width: 350, padding: 3, borderRadius: 2, textAlign: 'center', backgroundColor: '#fff' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>

                <ErrorMessage error={error} />
                <Message message={message} />

                {isLogin ? (
                    <Login setError={setError} setMessage={setMessage} setIsAuth={setIsAuth} />
                ) : (
                    <Register setError={setError} setMessage={setMessage} />
                )}

                <AuthToggle isLogin={isLogin} handleToggle={handleToggle} />
                <GoogleLoginAuth />
            </Paper>
        </Box>
    );
};

export default Auth;
