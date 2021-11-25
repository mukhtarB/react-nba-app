import React, { Component } from "react";
import axios from "axios";
import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';
import VidHeader from "./vidHeader";

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
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <VidHeader teamData={team} />
                Video Body Component?
            </div>
        )
    }
}

export default withRouterHOC(VideoArticle);