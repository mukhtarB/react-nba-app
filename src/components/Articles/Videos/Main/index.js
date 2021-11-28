import React from 'react';
import VideoList from '../../../../widgets/VideosList/videosList';

const VideosMain = () => {
    return (
        <div>
            <VideoList
                type="card"
                loadmore={true}
                start={0}
                amount={10}
            />
        </div>
    )
}

export default VideosMain;