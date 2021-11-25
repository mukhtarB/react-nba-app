import React from "react";

import TeamInfo from "../../Elements/teamInfo";
import PostData from "../../Elements/postData.js";

const NewsHeader = (props) => {

    const teamInfo = (team) => {
        return team ? (
            <TeamInfo team={team} />
        ) : null;
    }

    const post_Data = (date, author) => {
        return <PostData data={{ date, author }} />
    }

    return(
        <div>
            {teamInfo(props.teamData)}
            {post_Data(props.date, props.author)}
        </div>
    )
}

export default NewsHeader;