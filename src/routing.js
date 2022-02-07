import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home/home";
import Layout from './hoc/Layout/layout';
import NewsArticles from "./components/Articles/News/Post";
import VideoArticle from "./components/Articles/Videos/Video/video_index";
import NewsMain from "./components/Articles/News/Main";
import VideosMain from "./components/Articles/Videos/Main";
import SignIn from "./components/signIn/signIn";
import Dashboard from "./components/Dashboard/dashboard";
import PrivateRoute from "./components/AuthRoutes/privateRoutes";
import F404 from "./components/AuthRoutes/404";

const Routing = (props) => {
    return(
        <Layout user={props.user}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/news' element={<NewsMain />} />
                <Route path='/videos' exact element={<VideosMain />} />
                <Route path='/articles/:id' element={<NewsArticles />} />
                <Route path='/videos/:id' element={<VideoArticle />} />
                <Route path='/sign-in' element={<SignIn />} />
                
                {/* METHODs 0 */}
                {/* <Route element={<PrivateRoute />} >
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route> */}

                {/* METHODs 1a & 1b */}
                <Route path='/dashboard' element={
                    <PrivateRoute {...props}>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="*" element={<F404 />} />
            </Routes>
        </Layout>
    )
}

export default Routing;