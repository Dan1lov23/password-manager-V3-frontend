import "./passwordInfoTitle.css";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function PasswordInfoTitle({serviceName}:{serviceName:string}) {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("passwordInfoTitleDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordInfoTitleDark");
        } else {
            setThemeStyle("passwordInfoTitleLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <p>Пароль от {serviceName}</p>
            </div>
        </>
    )
}