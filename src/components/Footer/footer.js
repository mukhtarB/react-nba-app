import React from "react";
import { Link } from 'react-router-dom';

import style from  "./footer.module.css";

import { currentYear } from "../../config";

const Footer = () => (
    <footer className={style.footer}>
        <Link to = '/' className={style.logo}>
            <img alt = "nba logo" src="/images/nba_logo.png" />
        </Link>
        <div className={style.right}>
            @ NBA { currentYear } All Right Reserved.
        </div>
    </footer>
)

export default Footer;