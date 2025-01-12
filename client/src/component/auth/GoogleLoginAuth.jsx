import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contex/AuthContex'
import axios from 'axios'

const GoogleLoginAuth = () => {

    const navigate = useNavigate();
    const { setIsAuth } = useAuth();


    const handleLogin = async (response) => {
        try {
            // Decode the Google response token
            const userInfo = jwtDecode(response.credential);
            console.log('Google user info:', userInfo);

            // Send the Google credential to your backend to get a custom JWT
            const { data } = await axios.post('/auth/google', {
                token: response.credential,
            });

            console.log(data);
            
            
            localStorage.setItem('token', data.token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container text-center mt-4">
            <h4 className="my-3">(OR)</h4>
            <div className="d-flex justify-content-center">
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={(err) => console.log(err)}
                    auto_select={true}
                />
            </div>
        </div>
    )
}

export default GoogleLoginAuth