import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./components/Home/home";

class Routing extends Component {
    render(){
        return(
            <Routes>
                <Route path='/' exact element={<Home />} />
            </Routes>
        )
    }
}

export default Routing;