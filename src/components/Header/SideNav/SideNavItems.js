import React from "react";
import { Link } from 'react-router-dom';

import style from './sideNav.module.css';
import FontAwesome from "react-fontawesome";
import { firebase } from "../../../firebase";
import withRouterHOC from "../../../hoc/withRouter/withRouter";


const SideNavItems = (props) => {
    
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
            text: 'Dashboard',
            link: '/dashboard',
            login: false
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

    // render signin or sign out on sideNav based on user info
    const restrictedElements = (item, i) => {
        let template;

        if (props.user === null && item.login) {
            template = element(item, i)
        }

        if (props.user !== null && !item.login) {
            if (item.link === '/sign-out') {
                template = (
                    <div className={item.type}
                    key={i}
                    onClick={() => {
                        firebase.auth().signOut()
                        .then(() => {
                            props.navigate('/')
                        })
                    }}
                    >
                        <FontAwesome name={item.icon} />
                        {item.text}
                    </div>
                )
            } else {
                template = element(item, i)
            }
        }

        return template;
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

export default withRouterHOC(SideNavItems);