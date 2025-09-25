import "./passwordsList.css";

import {useSelector} from "react-redux";
import {type SetStateAction, useEffect, useState} from "react";

import type {Dispatch} from "react";
import type {Password} from "../../../../interfaces/PasswordInterface.ts";

import PasswordListCart from "../password list cart/PasswordListCart.tsx";
import SearchPasswordInput from "../search password input/SearchPasswordInput.tsx";

export default function PasswordsList({hideInfoFunction, passwords, setShowCheckLogin, setShowCheckPassword}:{hideInfoFunction: () => void, passwords:[Password], setShowCheckLogin:Dispatch<SetStateAction<boolean>>, setShowCheckPassword:Dispatch<SetStateAction<boolean>>}) {

    const theme = useSelector((state:any) => state.theme);
    const currentPassword = useSelector((state:any) => state.currentPassword);

    const [themeStyle, setThemeStyle] = useState("passwordsListDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordsListDark");
        } else {
            setThemeStyle("passwordsListLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                <SearchPasswordInput searchArray={passwords} setShowCheckLogin={setShowCheckLogin} setShowCheckPassword={setShowCheckPassword}/>
                <div className="separator"></div>
                {passwords.map((password: any, index: number) => (
                    <div className="passwords" onClick={() => hideInfoFunction()}>
                        <PasswordListCart password={password} currentPassword={currentPassword} index={index}/>
                    </div>
                ))}
            </div>
        </>
    )
}
