import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contex/AuthContex'
import axios from 'axios'
import { showToast } from '../../utils/toastUtils'

const GoogleLoginAuth = () => {

    const navigate = useNavigate();
    const { setIsAuth } = useAuth();


    const handleLogin = async (response) => {
        try {
            // Send the Google credential to your backend to get a custom JWT
            const { data } = await axios.post('api/auth/google', {
                token: response.credential,
            });
            localStorage.setItem('token', data.token);
            setIsAuth(true);
            navigate('/');
            showToast('Login successfull!', 'success')
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