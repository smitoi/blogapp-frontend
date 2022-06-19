import '../../App.css';
import AuthContext from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import useAxios from "../../api/axios";
import ArticleForm from "../../components/ArticleForm";

function Edit(props) {
    const axios = useAxios();
    const {user} = useContext(AuthContext);
    const [article, setArticle] = useState({});

    useEffect(() => {
        if (!user) {
            return <Redirect to='/login'/>;
        }

        axios.get(`/api/article/${props.match.params.id}/`)
            .then((response) => {
                setArticle(response.data);
            });
    }, []);

    if (article) {
        return <ArticleForm article={article}/>;
    } else {
        return <Redirect to='/'/>;
    }
}

export default Edit;
