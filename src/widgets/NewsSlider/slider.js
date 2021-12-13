import React, { Component } from "react";
import { dbArticles, firebaseLooper } from '../../firebase';

import SliderTemplate from "./sliderTemplate";

// import axios from "axios";
// import { url } from '../../config';

class NewsSlider extends Component {

    state = {
        news: []
    }

    UNSAFE_componentWillMount () {
        dbArticles.limitToFirst(3).once('value')
        .then( snapshot => {
            let news = firebaseLooper(snapshot);

            this.setState({
                news
            });
        });
        
        
        // axios.get(`${url}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        // .then ( (response) => {
        //     this.setState({
        //         news: response.data
        //     })
        // })
    }

    render (){
        return (
            <SliderTemplate data={this.state.news} type={this.props.type} settings={this.props.settings} />
        )
    }
}

export default NewsSlider;