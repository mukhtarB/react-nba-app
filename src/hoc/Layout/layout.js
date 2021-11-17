import React, { Component } from "react";
import './layout.css';

import Header from "../../components/Header/header";

class Layout extends Component {

    state = {
        showNav: false
    }

    toggleSideNav = (action) => {
        return this.setState({
            showNav: action
        })
    }



    render(){
        return (
            <div>
                <Header
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSideNav(false)}
                    onOpenNav={() => this.toggleSideNav(true)}
                />
                {/* <hr /> */}
                Current Page: {this.props.children}
                <hr />
                Footer
            </div>
        )
    }
}

export default Layout;