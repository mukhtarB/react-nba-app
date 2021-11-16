import React, { Component } from "react";

class Layout extends Component {
    render(){
        return (
            <div>
                Header 
                <hr />
                Current Page: {this.props.children}
                <hr />
                Children
            </div>
        )
    }
}

export default Layout;