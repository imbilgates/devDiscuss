import { Box, TextField, Button, Grid } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { showToast } from "../../utils/toastUtils";


const Register = ({ setError, setMessage, setIsLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await axios.post('api/auth/register', { name, email, password });
            setMessage(response.data.message);
            setIsLogin(prev => !prev);
            showToast('Registerd successfull!', 'success')
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
            showToast(err.response?.data?.error || 'Something went wrong', 'error');
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <p><strong className="text-red">*</strong>please provide your google email if you want to get mail notification<strong className="text-red">*</strong></p>
                <Grid item xs={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Grid>
            </Grid>
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
            </Button>
        </Box>
    );

};

export default Register;
