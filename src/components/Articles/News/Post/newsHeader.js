import React from "react";

import TeamInfo from "../../Elements/teamInfo";

const NewsHeader = (props) => {

    const teamInfo = (team) => {
        return team ? (
            <TeamInfo team={team} />
        ) : null;
    }

    return(
        <div>
            {teamInfo(props.teamData)}
        </div>
    )
}

export default NewsHeader;