import React from "react";

import style from './videosList.module.css';

import TeamCardInfo from "../CardInfo/teamcardInfo";
import { Link } from "react-router-dom";


const VideosListTemplate = (props) => {
    // console.log(props)
    return props.data.map( (item, i) => {
        return (
            <Link to={`/videos/${item.id}`} key={i}>
                <div className={style.videoListItem_wrapper}>
                    <div className = {style.left}
                        style={{
                            background: `url(/images/videos/${item.image})`
                        }}
                    >
                        <div style ={{
                            background: `url(/images/play.png)`
                        }}></div>
                    </div>
                    <div className = {style.right}>
                        <h2>{item.title}</h2>
                    </div>
                </div>
            </Link>
        )
    })
}

export default VideosListTemplate;