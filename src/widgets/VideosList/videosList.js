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

    render () {
        return (
            <div className={style.videoList_wrapper}>
                { this.renderTitle() }
            </div>
        )
    }
}

export default VideoList;