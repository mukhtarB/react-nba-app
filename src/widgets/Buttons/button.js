import React from "react";
import { Link } from "react-router-dom";

import style from './button.module.css';

const Button = (props) => {
    let template = null;

    switch (props.type) {
        case ('load_more'):
            template = (
                <button className = {style.blue_btn} onClick={props.loadMore}>
                    {props.cta}
                </button>
            );
            break;

        case 'linkTo':
            template = (
                <Link to = {props.linkTo} className={style.blue_btn}>
                    {props.cta}
                </Link>
            );
            break;
    
        default:
            template = null;
            break;
    }

    return template;
}

export default Button;