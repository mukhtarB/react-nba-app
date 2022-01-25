import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB, firebaseST, firebaseLooper, dbTeams } from "../../../../firebase";

// import axios from "axios";
// import { url } from '../../../../config';
// import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';
import NewsHeader from "./newsHeader";


const NewsArticles = () => {
    const params = useParams();

    const [headerState, setHeaderState] = useState({
        article: [],
        team: [],
        imgURL: null
    });

    useEffect( () => {
        firebaseDB.ref(`articles/${params.id}`).once('value')
        .then( snapshot => {
            let article = snapshot.val();

            // dbTeams.orderByChild("id").equalTo(article.team).once('value')
            dbTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then( snapshot => {
                
                const team = firebaseLooper(snapshot);

                firebaseST.ref('images').child(`${article.image}`).getDownloadURL()
                .then( imgURL => {
                    setHeaderState({
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

        // axios.get(`${url}/articles/${params}`)
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
    }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

    const article = headerState.article;
    const team = headerState.team;
    const imgURL = headerState.imgURL;

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
                        background: `url(${imgURL}), url('/images/articles/${article.image}')`
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

export default NewsArticles;