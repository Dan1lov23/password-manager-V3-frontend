import "./passwordListCart.css";

import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import FavoriteButton from "../favorite button/FavoriteButton.tsx"

import type {Password} from "../../../../interfaces/PasswordInterface.ts";

export default function PasswordListCart({currentPassword, password, index}:{password:Password, currentPassword:Password, index:number}) {

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("passwordListCartDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordListCartDark");
        } else {
            setThemeStyle("passwordListCartLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                {currentPassword.passwordId === password.passwordId ? (
                    <div className="currentPassword" key={index}
                         onClick={() => dispatch({type: "SET_CURRENT_PASSWORD", payload: password})}>
                        <p>{password.serviceName}</p>
                        <FavoriteButton password={password}/>
                    </div>
                ) : (
                    <div key={index} className="password"
                         onClick={() => dispatch({type: "SET_CURRENT_PASSWORD", payload: password})}>
                        <p>{password.serviceName}</p>
                        <FavoriteButton password={password}/>
                    </div>
                )}
            </div>
        </>
    )
}