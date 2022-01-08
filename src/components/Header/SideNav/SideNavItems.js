import React from "react";
import { Link } from 'react-router-dom';

import style from './sideNav.module.css';
import FontAwesome from "react-fontawesome";


const SideNavItems = () => {

    const items = [
        {
            type: style.option,
            icon: 'home',
            text: 'Home',
            link: '/',
            login: ''
        },
        {
            type: style.option,
            icon: 'file-text',
            text: 'News',
            link: '/news',
            login: ''
        },
        {
            type: style.option,
            icon: 'play',
            text: 'Videos',
            link: '/videos',
            login: ''
        },
        {
            type: style.option,
            icon: 'sign-in-alt',
            text: 'Sign In',
            link: '/sign-in',
            login: true
        },
        {
            type: style.option,
            icon: 'sign-out-alt',
            text: 'Sign Out',
            link: '/sign-out',
            login: false
        },
    ]

    const element = (item, i) => {
        return(
            <div className={item.type} key={i}>
                <Link to={item.link}>
                    <FontAwesome name={item.icon} />
                    {item.text}
                </Link>
            </div>
        )
    }

    const restrictedElements = () => {
        
    }

    const showItems = () => {
        return items.map((item, i) => {
            return item.login !== '' ?
                restrictedElements(item, i)
            :
                element(item, i)
        })
    }

    return (
        <div>
            {showItems()}
        </div>
    )
}

export default SideNavItems;