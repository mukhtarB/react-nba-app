import React, { Component } from "react";
import './layout.css'

import Header from "../../components/Header/header";

class Layout extends Component {
    render(){
        return (
            <div>
                <Header />
                <hr />
                Current Page: {this.props.children}
                <hr />
                Footer
            </div>
        )
    }
}

export default Layout;