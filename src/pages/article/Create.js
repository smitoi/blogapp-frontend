import '../../App.css';
import AuthContext from "../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import useAxios from "../../api/axios";
import ArticleForm from "../../components/ArticleForm";

function Create() {
    const {user} = useContext(AuthContext);

    return user ? <ArticleForm/> : <Redirect to='/login'/>;
}

export default Create;
