import React from "react";
import { Link } from "react-router-dom";

import style from './slider.module.css';
import Slider from "react-slick";

const SliderTemplate = (props) => {
    let template = null;

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        SlidesToScroll:1,
        ...props.settings
    }

    switch (props.type) {
        case ('featured'):

        template = props.data.map( (item, i) => {
            return (
                <div key={i}>
                    <div className = {style.featured_item}>
                        <div className = {style.featured_image}
                            style ={{
                                background: `url(../images/articles/${item.image})`
                            }}
                        >
                        
                        </div>
                        <Link to ={`/articles/${item.id}`}>
                            <div className={style.featured_caption}>
                                {item.title}
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
            
            break;
    
        default:
            template = null;
            break;
    }

    return (
        <Slider {...settings}>
            {template}
        </Slider>
    )
}

export default SliderTemplate;