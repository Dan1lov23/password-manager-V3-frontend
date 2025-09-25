import "./header.css"

import {useSelector} from "react-redux";

import {useNavigate} from 'react-router-dom';

import {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUnlock, faStar} from "@fortawesome/free-solid-svg-icons";

import LogoutButton from "../for desctop header interface/logout button/LogoutButton.tsx";
import AddPasswordButton from "../for desctop header interface/add password button/AddPasswordButton.tsx";
import ThemeSwitcher from "../for desctop header interface/theme switcher/ThemeSwitcher.tsx";
import MobileHeaderButton from "../mobile header intergace/mobile header button/MobileHeaderButton.tsx";
import GeneratePasswordButton from "../for desctop header interface/generate password button/GeneratePasswordButton.tsx";

export default function Header() {

    const navigate = useNavigate();

    const theme = useSelector((state:any) => state.theme);
    const [themeStyle, setThemeStyle] = useState("headerDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("headerDark");
        } else {
            setThemeStyle("headerLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <div className="logo">
                    <p>Password manager</p>
                </div>
                <div className="list">
                    <div className="listIcon">
                        <p onClick={() => navigate("/")}><FontAwesomeIcon icon={faHome}/></p>
                    </div>
                    <div className="listIcon">
                        <p onClick={() => navigate("/passwords")}><FontAwesomeIcon icon={faUnlock}/></p>
                    </div>
                    <div className="listIcon" onClick={() => navigate("/favorites")}>
                        <p><FontAwesomeIcon icon={faStar}/></p>
                    </div>
                    <div className="listPart">
                        <AddPasswordButton/>
                    </div>
                    <div className="listPart">
                        <GeneratePasswordButton/>
                    </div>
                    <div className="listPart">
                        <LogoutButton/>
                    </div>
                    <div className="themeSwither">
                        <ThemeSwitcher/>
                    </div>
                    <div className="mobileInterface">
                        <MobileHeaderButton/>
                    </div>
                </div>
            </div>
        </>
    )
}