import React, { Component } from "react";
import { firebaseDB, firebaseLooper, dbTeams } from "../../../../firebase";

// import axios from "axios";
// import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';

import NewsHeader from "./newsHeader";

class NewsArticles extends Component {

    state = {
        article: [],
        team: []
    }

    UNSAFE_componentWillMount () {
        firebaseDB.ref(`articles/${this.props.params.id}`).once('value')
        .then( snapshot => {
            let article = snapshot.val();

            dbTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then( snapshot => {
                
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
            })
        })


        // axios.get(`${url}/articles/${this.props.params.id}`)
        // .then( response => {
        //     let article = response.data;

        //     axios.get(`${url}/teams/${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             article,
        //             team: response.data
        //         })
        //     })
        // })
    }

    render () {

        const article = this.state.article;
        const team = this.state.team;

        return (
            <div className = {style.articleWrapper}>
                <NewsHeader
                    teamData={team[0]}
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
                    <div className={style.articleText}>
                        {article.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouterHOC(NewsArticles);