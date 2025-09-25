import "./showButton.css";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export default function ShowButton({showCheck, setShowCheck}:{showCheck:boolean, setShowCheck:any}) {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("showButtonDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("showButtonDark");
        } else {
            setThemeStyle("showButtonLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <button onClick={() => setShowCheck(!showCheck)}>
                    {showCheck ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                        <FontAwesomeIcon icon={faEye} />
                    )}
                </button>
            </div>
        </>
    )
}