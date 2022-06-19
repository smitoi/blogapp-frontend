import axios from 'axios';
import {useContext} from "react";
import AuthContext from "../context/AuthContext";

const useAxios = () => {
    const {REACT_APP_API_URL} = process.env;
    const {authTokens} = useContext(AuthContext);

    // TODO: Intercept expired token for refresh
    return axios.create({
        baseURL: REACT_APP_API_URL,
        timeout: 5000,
        headers: {
            Authorization: authTokens?.access ? `Bearer ${authTokens.access}` : null,
            accept: 'application/json',
        }
    });
}

export default useAxios;
