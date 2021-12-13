import React from "react";

import moment from "moment";
import FontAwesome from "react-fontawesome";
import style from './teamCardInfo.module.css';

const TeamCardInfo = (props) => {

    const teamName = (teams, team_id) => {

        let data = teams.find( (item) => {
            return item.teamId === team_id
        });
        if (data) {
            return data.name
        }
    }

    const formatDate = (date) => {
        return moment(date).format('MM-DD-YYYY');
    }

    return (
        <div className={style.cardInfo}>
            <span className={style.teamName}>
                {teamName(props.teams, props.team_id)}
            </span>
            <span className={style.date}>
                <FontAwesome name = 'clock' />
                {formatDate(props.date)}
            </span>
        </div>
    )
}

export default TeamCardInfo;