import React, { Component } from "react";
import axios from "axios";

import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';

import NewsHeader from "./newsHeader";

class NewsArticles extends Component {

    state = {
        article: [],
        team: []
    }

    UNSAFE_componentWillMount () {
        axios.get(`${url}/articles/${this.props.params.id}`)
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
            <div className = {style.articleWrapper}>
                <NewsHeader
                    teamData={team}
                    date={article.date}
                    author={article.author}
                />
                
                <div className={style.articleBody}>
                    <h1>{article.title}</h1>
                    <div
                        className={style.articleImage}
                        style={{
                            background: `url('/images/articles/${article.image}')`
                        }}
                    >

                    </div>
                    <div>
                        {article.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouterHOC(NewsArticles);