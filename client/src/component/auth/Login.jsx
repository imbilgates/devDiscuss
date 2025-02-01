import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';

const Login = ({ setError, setMessage, setIsAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await axios.post('api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setMessage(response.data.message);
            setIsAuth(true);
            toast.success('Login successfull!');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
            toast.error(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                required
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default Login;
