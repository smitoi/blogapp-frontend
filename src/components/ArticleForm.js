import '../App.css';
import {useEffect, useState} from "react";
import useAxios from "../api/axios";


const ArticleForm = (props) => {
    const [title, setTitle] = useState(props.article?.title);
    const [content, setContent] = useState(props.article?.content);

    useEffect(() => {
        if (props.article) {
            setTitle(props.article?.title);
            setContent(props.article?.content);
        }
    }, [title, content, props.article]);


    const [error, setError] = useState('');
    const axios = useAxios();

    const handleForm = async (e) => {
        e.preventDefault();

        if (props.article) {
            axios.put(`/api/article/${props.article.id}/`, {title, content})
                .then((_) => {
                    window.location = '/article';
                })
                .catch((err) => {
                    setError(err.message);
                });
        } else {
            axios.post(`/api/article/`, {title, content})
                .then((_) => {
                    window.location = '/article';
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    };

    return <div>
        <h1>{props.article ? 'Update Article' : 'Create Article'}</h1>
        <p style={{visibility: error.length === 0 ? 'visible' : 'hidden'}}>{error}</p>
        <form onSubmit={handleForm}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="username"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
            />

            <label htmlFor="password">Content:</label>
            <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                required
            />
            <button>{props.article ? 'Update' : 'Create'}</button>
        </form>
    </div>;
}

export default ArticleForm;
