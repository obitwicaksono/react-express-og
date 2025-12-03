import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignInButton() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    try {
                        const decoded = jwt_decode(credentialResponse.credential);
                        const user = {
                            id: decoded.sub,
                            name: decoded.name,
                            email: decoded.email,
                            picture: decoded.picture,
                        };
                        login(user);
                        navigate('/user');
                    } catch (e) {
                        console.error('decode error', e);
                    }
                }}
                onError={() => {
                    console.error('Google login failed');
                }}
            />
        </div>
    );
}