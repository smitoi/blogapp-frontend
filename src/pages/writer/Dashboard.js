import '../../App.css';
import AuthContext from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import useAxios from "../../api/axios";

function Dashboard() {
    const axios = useAxios();

    useEffect(() => {
        axios.get('/api/writer/')
            .then((response) => {
                setWriters(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    let {user} = useContext(AuthContext);

    const [writers, setWriters] = useState([]);
    const [error, setError] = useState('');

    return user ? (
        error ?
            <p>{error}</p>
            : <div>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Is Editor</td>
                        <td>Total Articles</td>
                        <td>Total Recent Articles</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        writers.map((writer) =>
                            <tr key={writer.id}>
                                <td>{writer.name}</td>
                                <td>{writer.is_editor ? 'Yes' : 'No'}</td>
                                <td>{writer.total_articles}</td>
                                <td>{writer.total_recent_articles}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
    ) : <Redirect to='/login'/>;
}

export default Dashboard;
