import React, { Component } from "react";
import axios from "axios";

import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';

class NewsArticles extends Component {

    state = {
        articles: [],
        team: []
    }

    componentWillMount () {
        axios.get(`${url}/articles/${this.props.params.id}`)
        .then( response => {
            console.log(response.data)
        })
    }

    render () {
        return (
            <div>
                News Article View
            </div>
        )
    }
}

export default withRouterHOC(NewsArticles);