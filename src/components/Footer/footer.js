import React from "react";
import { Link } from 'react-router-dom';

import style from  "./footer.module.css";

const Footer = () => (
    <footer className={style.footer}>
        <Link to = '/' className={style.logo}>
            <img alt = "nba logo" src="/images/nba_logo.png" />
        </Link>
        <div className={style.right}>
            @ NBA 2021 All Right Reserved.
        </div>
    </footer>
)

export default Footer;