import React, { Component } from "react";
import axios from "axios";
import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';

class VideoArticle extends Component {

    state = {
        article:[],
        team:[]
    }


    UNSAFE_componentWillMount () {
        axios.get(`${url}/videos/${this.props.params.id}`)
        .then( response => {
            let article = response.data;

            axios.get(`${url}/teams/${article.team}`)
            .then( response => {
                this.setState({
                    article,
                    team: response.data
                })
            })
        })
    }

    render () {
        console.log(this.state)
        return (
            <div>
                Video Article Component
            </div>
        )
    }
}

export default withRouterHOC(VideoArticle);