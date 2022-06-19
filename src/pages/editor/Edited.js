import '../../App.css';
import useAxios from "../../api/axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Edited() {
    const axios = useAxios();

    const [draftArticles, setDraftArticles] = useState([]);
    const [approvedArticles, setApprovedArticles] = useState([]);
    const [error, setError] = useState('');

    const getEditedArticles = () => {
        axios.get('/api/article-approval/')
            .then((response) => {
                setDraftArticles(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });

        axios.get('/api/articles-edited/')
            .then((response) => {
                setApprovedArticles(response.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    useEffect(() => {
        getEditedArticles();
    }, []);

    const modifyStatus = (article, status) => {
        axios.put(`/api/article-approval/${article.id}/`, {
            status,
        }).then(() => {
            getEditedArticles();
        });
    };

    return error ?
        <p>{error}</p>
        : <div>
            <h1>Articles awaiting approval</h1>
            <table>
                <thead>
                <tr>
                    <td>Title</td>
                    <td>Author</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {draftArticles.map((article) => <tr key={article.id}>
                    <Link to={`/article/${article.id}`}>{article.title}</Link>
                    <td>{article.written_by.name}</td>
                    <td>
                        <button onClick={() => {
                            modifyStatus(article, 'approved')
                        }}>Approve
                        </button>
                        <button onClick={() => {
                            modifyStatus(article, 'rejected')
                        }}>Reject
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h1>Articles reviewed</h1>
            <table>
                <thead>
                <tr>
                    <td>Title</td>
                    <td>Approved</td>
                    <td>Author</td>
                </tr>
                </thead>
                <tbody>
                {
                    approvedArticles.map((article) =>
                        <tr key={article.id}>
                            <Link to={`/article/${article.id}`}>{article.title}</Link>
                            <td>{article.status === 'approved' ? 'Yes' : 'No'}</td>
                            <td>{article.written_by.name}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>;
}

export default Edited;
