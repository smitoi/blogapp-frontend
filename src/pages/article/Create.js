import '../../App.css';
import AuthContext from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import useAxios from "../../api/axios";

function Create() {
    const {user} = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');
    const axios = useAxios();

    useEffect(() => {
        axios.get('/api/article/')
            .then((response) => {
                setArticles(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return user ? (
        error ?
            <p>{error}</p>
            : <div>
                <table>
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Published</td>
                        <td>Author</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        articles.map((article) =>
                            <tr>
                                <td>{article.title}</td>
                                <td>{article.status === 'published' ? 'Yes' : 'No'}</td>
                                <td>{article.written_by.name}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
    ) : <Redirect to='/login'/>;
}

export default Dashboard;
