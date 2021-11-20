import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import style from './newsList.module.css';
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

    renderNews = (type) => {
        let template = null;

        switch (type) {
            case ('card'):
                template = this.state.items.map( (item, i) => {
                    return (
                        <div>
                            <div className={style.newsList_item}>
                                <Link to = {`/articles/${item.id}`}>
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>
                    )
                })
                break;
        
            default:
                template = null;
                break;
        }

        return template;
    }

    render () {
        return (
            <div>
                { this.renderNews(this.props.type) }
            </div>
        )
    }
}

export default NewsList;