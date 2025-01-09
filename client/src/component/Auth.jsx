import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../contex/AuthContex';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const {  setIsAuth } = useAuth();

    const navigate = useNavigate();


    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setError('');
        setMessage('');
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            if (isLogin) {
                const response = await axios.post('/auth/login', { email, password });
                localStorage.setItem('token', response.data.token);
                setMessage(response.data.message);
                setIsAuth(true);
                navigate('/')
            } else {
                const response = await axios.post('/auth/register', { name, email, password });
                setMessage(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ padding: 2 }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 350,
                    padding: 3,
                    borderRadius: 2,
                    textAlign: 'center',
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                {message && (
                    <Typography variant="body2" sx={{ color: '#4caf50' }} gutterBottom>
                        {message}
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {!isLogin && (
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={!isLogin}
                            error={!!error}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: error ? 'red' : '' },
                                    '&:hover fieldset': { borderColor: error ? 'red' : '' },
                                },
                            }}
                        />
                    )}
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: error ? 'red' : '' },
                                '&:hover fieldset': { borderColor: error ? 'red' : '' },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!error}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: error ? 'red' : '' },
                                '&:hover fieldset': { borderColor: error ? 'red' : '' },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Box>
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
            </Paper>
        </Box>
    );
};

export default Auth;
