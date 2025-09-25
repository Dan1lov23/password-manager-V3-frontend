import "./noAuthWarning.css";

import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function NoAuthWarning() {

    const navigate = useNavigate();

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("noAuthWarningDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("noAuthWarningDark");
        } else {
            setThemeStyle("noAuthWarningLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <p>Вы не авторизовались</p>
                <div className="link" onClick={() => navigate("/login")}>
                    <p>Войти</p>
                </div>
            </div>
        </>
    )
}