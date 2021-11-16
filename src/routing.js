import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home/home";
import Layout from './hoc/Layout/layout';

class Routing extends Component {
    render(){
        return(
            <Layout>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                </Routes>
            </Layout>
        )
    }
}

export default Routing;