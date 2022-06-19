import {createContext, useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import useAxios from "../api/axios";

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwt_decode(localStorage.getItem('authTokens'))
            : null
    );

    const [userProfile, setUserProfile] = useState(() =>
        localStorage.getItem('userProfile')
            ? JSON.parse(localStorage.getItem('userProfile'))
            : null
    );

    const [loading, setLoading] = useState(true);

    const history = useHistory();
    const axios = useAxios();

    const loginUser = async (username, password) => {
        let response = await axios.post('/api/auth/token/obtain/', JSON.stringify({
            username,
            password
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            let data = response.data;
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));

            const jwt = jwt_decode(data.access);
            setUser(jwt);

            response = await axios.get(`/api/writer/${jwt.user_id}`);

            if (response.status === 200) {
                data = response.data;
                setUserProfile(data);
                localStorage.setItem('userProfile', JSON.stringify(data));
            } else {
                throw new Error(`Could not retrieve writer profile for user ${jwt.user_id}, failed with status ${response.status}`);
            }

            history.push('/');
        } else {
            throw new Error(`Failed login with status ${response.status}`);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.push('/');
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        userProfile,
        setUserProfile,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

const AuthContext = createContext({});

export default AuthContext;
