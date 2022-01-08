import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home/home";
import Layout from './hoc/Layout/layout';
import NewsArticles from "./components/Articles/News/Post";
import VideoArticle from "./components/Articles/Videos/Video/video_index";
import NewsMain from "./components/Articles/News/Main";
import VideosMain from "./components/Articles/Videos/Main";
import SignIn from "./components/signIn/signIn";

const Routing = (props) => {
    return(
        <Layout user={props.user}>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/news' exact element={<NewsMain />} />
                <Route path='/videos' exact element={<VideosMain />} />
                <Route path='/articles/:id' exact element={<NewsArticles />} />
                <Route path='/videos/:id' exact element={<VideoArticle />} />
                <Route path='/sign-in' exact element={<SignIn />} />
            </Routes>
        </Layout>
    )
}

export default Routing;