import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useAuth } from '../../contex/AuthContex';
import Login from './Login';
import Register from './Register';
import AuthToggle from './AuthToggle';
import ErrorMessage from './ErrorMessage';
import Message from './Message';
import GoogleLoginAuth from './GoogleLoginAuth';

import bgauth from '../../assets/bg-auth.png';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/Loading';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const { isAuth, setIsAuth, isLoading } = useAuth()

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setError('');
        setMessage('');
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        } else {
            navigate("/auth");
        }
    }, [isAuth, navigate]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box sx={styles.container}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>

                <ErrorMessage error={error} />
                <Message message={message} />

                {isLogin ? (
                    <Login setError={setError} setMessage={setMessage} setIsAuth={setIsAuth} />
                ) : (
                    <Register setError={setError} setMessage={setMessage} setIsLogin={setIsLogin} />
                )}

                <AuthToggle isLogin={isLogin} handleToggle={handleToggle} />
                <GoogleLoginAuth />
            </Paper>
        </Box>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundImage: `url(${bgauth})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(8px)',
    },
    paper: {
        width: 350,
        padding: 3,
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
};

export default Auth;
