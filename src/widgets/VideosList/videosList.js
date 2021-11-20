import React, { Component } from "react";
import axios from "axios";

import style from './videosList.module.css';

import { url } from "../../config";
import Button from "../Buttons/button";

class VideoList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        amount: this.props.amount,
        end: this.props.start + this.props.amount,
    }

    renderTitle = () => {
        return this.props.title ? 
            <h3> <strong>NBA</strong> Videos </h3>
            : null
    }

    loadMore = () => {
        console.log('true')
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button
                type="load_more" 
                loadMore={() => {this.loadMore()}}
                cta="load more videos"
            />
            : <Button type="linkTo" cta="More videos" linkTo = "/vidoes" />
    }

    render () {
        return (
            <div className={style.videoList_wrapper}>
                { this.renderTitle() }
                { this.renderButton() }
            </div>
        )
    }
}

export default VideoList;