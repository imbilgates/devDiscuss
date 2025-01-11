import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contex/AuthContex.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '317434108689-mbuq9eofdhbaj0q4p2alqs8tg2q3bmcp.apps.googleusercontent.com'


createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter >
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>,
    </GoogleOAuthProvider>
)
