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

    // renaming componentWillMount to componentidMount
    componentDidMount () {
       this.request(this.state.start, this.state.end)
    }

    request = (start, end) => {
        axios.get(`${url}/articles?_start=${start}&_end=${end}`)
        .then ( (response) => {
            this.setState({
                items: [...this.state.items, ...response.data]
            })
        })
    }

    loadMore = () => {
        let start = this.state.end
        let end = this.state.end + this.state.amount

        this.request(start, end);
    }

    renderNews = (type) => {
        let template = null;

        switch (type) {
            case ('card'):
                template = this.state.items.map( (item, i) => {
                    return (
                        <CSSTransition
                            classNames={{
                                enter: style.newsList_wrapper,
                                enterActive: style.newsList_wrapper_enter
                            }}
                            timeout={500}
                            key={i}
                        >
                            <div className={style.newsList_item}>
                                <Link to = {`/articles/${item.id}`}>
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </CSSTransition>
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
                <TransitionGroup
                    component="div"
                    className="list"
                >
                    { this.renderNews(this.props.type) }
                </TransitionGroup>
                
                <button onClick = {() => this.loadMore()}> load more </button>
            </div>
        )
    }
}

export default NewsList;