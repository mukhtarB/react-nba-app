import React from "react";
import style from './header.module.css';
import { Link } from 'react-router-dom';

import FontAwesome from "react-fontawesome";
import SideNavigation from "./SideNav/SideNav";

const Header = (props) => {


    // using FontAwesome to create bar-icon
    const navBars = () => (
        <div className = {style.bars}>
            <FontAwesome name='bars'
                onClick={props.onOpenNav}
                style={{
                    color:'#dfdfdf',
                    padding: '10px',
                    cursor: 'pointer'
                }}
            />
        </div>
    )


    // return jsx to render logo img
    const logo = () => {
        return (
            <Link to = '/' className={style.logo}>
                <img alt = "nba logo" src="/images/nba_logo.png" />
            </Link>
        )
    }

    return (
        <header className = {style.header}>
            <SideNavigation {...props} />
            <div className = {style.headerOpt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}

export default Header;