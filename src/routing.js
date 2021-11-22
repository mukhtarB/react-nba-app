import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home/home";
import Layout from './hoc/Layout/layout';
import NewsArticles from "./components/Articles/News/Post";

class Routing extends Component {
    render(){
        return(
            <Layout>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/articles/:id' exact element={<NewsArticles />} />
                </Routes>
            </Layout>
        )
    }
}

export default Routing;