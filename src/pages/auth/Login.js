import {useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import {Redirect} from "react-router-dom";


const Login = () => {
    const {loginUser} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            loginUser(username, password);
        } catch (e) {
            setErrorMessage(e.message);
        }
    };

    let {user} = useContext(AuthContext);

    return user ? <Redirect to='/'/> : <div>
        <h1>Sign In</h1>
        <p style={{visibility: errorMessage.length === 0 ? 'visible' : 'hidden'}}>{errorMessage}</p>
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <button>Sign In</button>
        </form>
    </div>
}

export default Login;
