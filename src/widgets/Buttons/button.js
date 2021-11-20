import React from "react";

import style from './button.module.css';

const Button = (props) => {
    let template = null;

    switch (props.type) {
        case ('load_more'):
            template = (
                <button className = {style.blue_btn} onClick={props.loadMore()}>
                    {props.cta}
                </button>
            );
            break;
    
        default:
            template = null;
            break;
    }

    return template;
}

export default Button;