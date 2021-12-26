import React, { Component } from "react";
import { firebaseLooper, dbTeams, dbVideos } from "../../firebase";

import style from './videosList.module.css';

// import { url } from "../../config";
// import axios from "axios";
import Button from "../Buttons/button";
import VideosListTemplate from "./videosListTemplate";

class VideoList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        amount: this.props.amount,
        end: this.props.start + this.props.amount,
    }

    UNSAFE_componentWillMount () {
        this.request (this.state.start, this.state.end)
    }

    request = (start, end) => {
        if(!this.state.teams.length) {
            dbTeams.once('value')
            .then( snapshot => {
                let teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })
            })


            // axios.get(`${url}/teams`)
            // .then( response => {
            //     this.setState({
            //         teams: response.data
            //     })
            // })
        }

        dbVideos.orderByChild("id").startAt(start).endAt(end)
        .once('value')
        .then( snapshot => {
            let videos = firebaseLooper(snapshot);

            this.setState({
                videos: [...this.state.videos, ...videos],
                start,
                end
            })
        })
        .catch( e => {
            console.log(e);
        })


        // axios.get(`${url}/videos?_start=${start}&_end=${end}`)
        // .then ( response => {
        //     this.setState({
        //         videos: [...this.state.videos, ...response.data],
        //         start,
        //         end
        //     })
        // })
    }

    renderTitle = () => {
        return this.props.title ? 
            <h3> <strong>NBA</strong> Videos </h3>
            : null
    }

    renderVideos = ()  => {
        let template = null;

        switch (this.props.type) {
            case 'card':
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams} />
                break;
        
            default:
                template = null;
                break;
        }

        return template
    }

    loadMore = () => {
        let start = this.state.end;
        let end = this.state.end + this.state.amount;

        // added +1 here
        this.request(start + 1, end);
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button
                type="load_more" 
                loadMore={() => {this.loadMore()}}
                cta="load more videos"
            />
            : <Button type="linkTo" cta="More videos" linkTo = "/videos" />
    }

    render () {
        return (
            <div className={style.videoList_wrapper}>
                { this.renderTitle() }
                { this.renderVideos() }
                { this.renderButton() }
            </div>
        )
    }
}

export default VideoList;