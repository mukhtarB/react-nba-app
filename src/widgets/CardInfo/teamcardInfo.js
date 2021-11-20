import React from "react";

import FontAwesome from "react-fontawesome";
import style from './teamCardInfo.module.css'

const TeamCardInfo = (props) => {

    const teamName = (teams, team_id) => {

        let data = teams.find( (item) => {
            return item.id === team_id
        });
        if (data) {
            return data.name
        }
    }

    return (
        <div className={style.cardInfo}>
            <span className={style.teamName}>
                {teamName(props.teams, props.team_id)}
            </span>
            <span className={style.date}>
                <FontAwesome name = 'clock' />
                {props.date}
            </span>
        </div>
    )
}

export default TeamCardInfo;