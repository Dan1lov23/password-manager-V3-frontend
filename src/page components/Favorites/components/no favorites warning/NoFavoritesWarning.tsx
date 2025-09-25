import "./noFavoritesWarning.css";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function NoFavoritesWarning() {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("noFavoritesWarningDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("noFavoritesWarningDark");
        } else {
            setThemeStyle("noFavoritesWarningLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <p>У вас нет избранного : (</p>
            </div>
        </>
    )
}