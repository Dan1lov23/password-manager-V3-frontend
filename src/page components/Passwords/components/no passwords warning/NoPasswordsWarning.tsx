import "./noPasswordsWarning.css";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function NoPasswordsWarning() {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("noPasswordsWarningDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("noPasswordsWarningDark");
        } else {
            setThemeStyle("noPasswordsWarningLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <p>У вас нет паролей : (</p>
            </div>
        </>
    )
}