import '../../App.css';
import {useEffect, useState} from "react";
import useAxios from "../../api/axios";

function List() {
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

    return error ?
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
                        <tr key={article.id}>
                            <td>{article.title}</td>
                            <td>{article.status === 'published' ? 'Yes' : 'No'}</td>
                            <td>{article.written_by.name}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>;
}

export default List;
