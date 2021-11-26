import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import style from './newsList.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { url } from '../../config';

import Button from "../Buttons/button";
import TeamCardInfo from "../CardInfo/teamcardInfo";

class NewsList extends Component {

    state = {
        teams: [],
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

        if (!this.state.teams.length) {
            axios.get(`${url}/teams`)
            .then( response => {
                this.setState({
                    teams: response.data
                })
            })
        }

        axios.get(`${url}/articles?_start=${start}&_end=${end}`)
        .then ( (response) => {
            this.setState({
                items: [...this.state.items, ...response.data],
                start,
                end
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
                                    <TeamCardInfo teams={this.state.teams} team_id={item.team} date={item.date} />
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </CSSTransition>
                    )
                })
                break;
            
            case ('cardMain'):
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
                            {/* <div className={style.newsList_item}> */}
                                <Link to = {`/articles/${item.id}`}>

                                    <div className = {style.flex_wrapper}>
                                        <div className ={style.left}
                                            style = {{
                                                background: `url('/images/articles/${item.image})`
                                            }}
                                        >

                                            <div></div>

                                        </div>

                                        <div className={style.right}>
                                            <TeamCardInfo teams={this.state.teams} team_id={item.team} date={item.date} />
                                            <h2>{item.title}</h2>
                                        </div>

                                    </div>
                                </Link>
                            {/* </div> */}
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
                
                <Button
                    type="load_more"
                    loadMore={() => this.loadMore()}
                    cta="load more"
                />
            </div>
        )
    }
}

export default NewsList;