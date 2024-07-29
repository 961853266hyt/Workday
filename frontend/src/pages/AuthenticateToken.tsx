import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';

const AuthenticateToken: React.FC  = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post(`${API_URL}/registration/${token}`);
                const data = response.data;

                if (response.status === 200) {
                    navigate('/signup', { state: { email: data.email } });
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Server error', error);
                alert('Server error, please try again later.');
            }
        };

        verifyToken();
    }, [token, navigate]);

    return (
        <div>
            Verifying token...
        </div>
    );
};

export default AuthenticateToken;
