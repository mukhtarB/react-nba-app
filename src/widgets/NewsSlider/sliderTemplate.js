import React from "react";

import Slider from "react-slick";

const SliderTemplate = (props) => {
    // console.log(props)

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        SlidesToScroll:1
    }

    return (
        <Slider {...settings}>
            <div> Template 1 </div>
            <div> Template 2 </div>
            <div> Template 3 </div>
            <div> Template 4 </div>
        </Slider>
    )
}

export default SliderTemplate;