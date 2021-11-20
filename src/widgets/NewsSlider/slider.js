import React, { Component } from "react";
import axios from "axios";

import SliderTemplate from "./sliderTemplate";

import { url } from '../../config';

class NewsSlider extends Component {

    state = {
        news: []
    }

    UNSAFE_componentWillMount () {
        axios.get(`${url}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        .then ( (response) => {
            this.setState({
                news: response.data
            })
        })
    }

    render (){
        // console.log(this.state.news)
        return (
            <SliderTemplate data={this.state.news} type={this.props.type} settings={this.props.settings} />
        )
    }
}

export default NewsSlider;