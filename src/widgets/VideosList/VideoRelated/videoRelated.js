import React from "react";

import style from '../videosList.module.css'
import VideosListTemplate from "../videosListTemplate";

const VideosRelated = (props) => {
    return (
        <div className={style.relatedWrapper}>
            <VideosListTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    )
}

export default VideosRelated;