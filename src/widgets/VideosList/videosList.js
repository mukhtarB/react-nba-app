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

    render () {
        return (
            <div>
                Video Component
            </div>
        )
    }
}

export default VideoList;