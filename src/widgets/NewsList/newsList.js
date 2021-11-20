import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { url } from '../../config'

class NewsList extends Component {

    state = {
        items: [],
        start: this.props.start,
        amount: this.props.amount,
        end: this.props.start + this.props.amount,
    }

    componentWillMount () {
        axios.get(`${url}/articles?_start=${this.state.start}&_end=${this.state.end}`)
        .then ( (response) => {
            this.setState({
                items: [...this.state.items, ...response.data]
            })
        })
    }

    render () {
        return (
            <div>
                News List Component
            </div>
        )
    }
}

export default NewsList;