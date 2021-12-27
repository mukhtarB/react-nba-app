import React, { Component } from "react";
// import axios from "axios";
// import { url } from '../../../../config';
import { firebaseLooper, dbTeams, firebaseDB, dbVideos } from "../../../../firebase";
import withRouterHOC from "../../../../hoc/withRouter/withRouter";

import style from '../../articles.module.css';
import VidHeader from "./vidHeader";
import VideosRelated from "../../../../widgets/VideosList/VideoRelated/videoRelated";

class VideoArticle extends Component {

    state = {
        article:[],
        team:[],
        teams:[],
        related: []
    }


    UNSAFE_componentWillMount () {
        firebaseDB.ref(`videos/${this.props.params.id}`).once('value')
        .then( snapshot => {
            let article = snapshot.val();

            dbTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then( snapshot => {
                
                const team = firebaseLooper(snapshot);

                this.setState({
                    article,
                    team
                })
                
                this.getRelated();
            })
        })

        
        // axios.get(`${url}/videos/${this.props.params.id}`)
        // .then( response => {
        //     let article = response.data;

        //     axios.get(`${url}/teams/${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             article,
        //             team: response.data
        //         })
        //     })

        //     this.getRelated();
        // })

    }

    getRelated = () => {
        dbTeams.once('value')
        .then( snapshot => {
            const teams = firebaseLooper(snapshot);
            
            // changing the logic slighlty as firebase does not have search by query 'q'
            dbVideos
            .orderByChild('team')
            .equalTo(this.state.article.team)
            .limitToFirst(3).once('value')
            .then( snapshot => {
                let related = firebaseLooper(snapshot);

                this.setState({
                    teams,
                    related
                })
            })
        })

        // axios.get(`${url}/teams`)
        // .then ( response => {
        //     let teams = response.data

        //     axios.get(`${url}/videos?q=${this.state.team.city}&_limit=3`)
        //     .then( response => {
        //         this.setState({
        //             teams,
        //             related: response.data
        //         })
        //     })
            
        // })

    }

    render () {

        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <VidHeader teamData={team[0]} />

                <div className={style.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >

                    </iframe>

                    <VideosRelated
                        data={this.state.related}
                        teams={this.state.teams}
                    />
                </div>

            </div>
        )
    }
}

export default withRouterHOC(VideoArticle);