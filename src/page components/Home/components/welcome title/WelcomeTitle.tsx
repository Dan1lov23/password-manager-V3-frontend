import "./welcomeTitle.css";

import {motion} from 'framer-motion';

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function WelcomeTitle() {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("welcomeTitleDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("welcomeTitleDark");
        } else {
            setThemeStyle("welcomeTitleLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="title"
                >

                    <p>Добро пожаловать в Password Manager</p>
                    <img src="https://img.icons8.com/?size=50&id=fwmtgMvkkc6o&format=gif&color=f7f7f7"/>
                </motion.div>
            </div>
        </>
    )
}