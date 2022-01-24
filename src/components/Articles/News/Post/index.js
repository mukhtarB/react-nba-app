import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB, firebaseST, firebaseLooper, dbTeams } from "../../../../firebase";

// import axios from "axios";
// import { url } from '../../../../config';
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';

import NewsHeader from "./newsHeader";

class NewsArticles extends Component {

    state = {
        article: [],
        team: [],
        imgURL: null
    }

    UNSAFE_componentWillMount () {
        firebaseDB.ref(`articles/${this.props.params.id}`).once('value')
        .then( snapshot => {
            let article = snapshot.val();

            // dbTeams.orderByChild("id").equalTo(article.team).once('value')
            dbTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then( snapshot => {
                
                const team = firebaseLooper(snapshot);

                firebaseST.ref('images').child(`${article.image}`).getDownloadURL()
                .then( imgURL => {
                    this.setState({
                        article,
                        team,
                        imgURL
                    })
                })
                .catch((error) => {
                    // Handle any errors
                    console.log("-> Error due to rendering both locala and cloud images:", error)
                });
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
                            background: `url(${this.state.imgURL}), url('/images/articles/${article.image}')`
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