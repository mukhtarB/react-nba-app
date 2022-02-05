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
        let mounted = true;

        firebaseDB.ref(`articles/${params.id}`).once('value')
        .then( snapshot => {
            let article = snapshot.val();
            return article;
        })
        .then( article => {

            return dbTeams.orderByChild("teamId").equalTo(article?.team).once('value')
                .then( snapshot => {
                    const team = firebaseLooper(snapshot);
                    return [article, team];
                }).catch ( teamErr => {
                    throw Error ("NBA App: Unable to retrieve (article.team) from dbTeams")
                });

        })
        .then( async ([article, team]) => {

            try {
                const imgURL = await firebaseST.ref('images').child(`${article.image}`).getDownloadURL();
                return [article, team, imgURL];
            } catch (error) {
                console.log(error);
                return [article, team, null];
            }

        })
        .then ( ([article, team, imgURL]) => {
            if (mounted) setHeaderState({article, team, imgURL})
        })
        .catch( fetchArticleError => {
            const errInfo = {
                src: 'NBA App',
                loc: 'NewsArticles Component',
                msg: 'Unable to retrieve articles / teams from firebaseDB'
            }
            throw Error(`
                ${fetchArticleError}
                ${errInfo.src},
                ${errInfo.loc},
                ${errInfo.msg}.`
            )
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
        return () => {
            mounted = false;
        }
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
                <div className={style.articleText}
                    dangerouslySetInnerHTML={{
                        __html:article.body
                    }}
                >
                    {article.body}
                </div>
            </div>
            
        </div>
    )
}

export default NewsArticles;