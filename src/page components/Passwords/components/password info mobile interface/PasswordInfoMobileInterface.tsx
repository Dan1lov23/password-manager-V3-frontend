import "./passwordInfoMobileInterface.css";

import PasswordInfoTitle from "../password info title/PasswordInfoTitle.tsx";

import {useSelector} from "react-redux";
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";

import type {Password} from "../../../../interfaces/PasswordInterface.ts";
import ShowButton from "../show button/ShowButton.tsx";
import ChangePasswordParamButton from "../change password param button/ChangePasswordParamButton.tsx";

export default function PasswordInfoMobileInterface({showCheckLogin, setShowCheckLogin, showCheckPassword, setShowCheckPassword, currentPassword}:{showCheckLogin: boolean, setShowCheckLogin:Dispatch<SetStateAction<boolean>>, showCheckPassword: boolean, setShowCheckPassword:Dispatch<SetStateAction<boolean>>, currentPassword:Password}) {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("passwordInfoMobileInterfaceLight");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordInfoMobileInterfaceDark");
        } else {
            setThemeStyle("passwordInfoMobileInterfaceLight");
        }
    }, [theme])


    return (
        <>
            <div className={themeStyle}>
                <PasswordInfoTitle serviceName={currentPassword.serviceName}/>
                <div className="loginP">
                    <div>
                        <p>Логин</p>
                        {!showCheckLogin ? (
                            <p>* * * * * * *</p>
                        ) : (
                            <p>{currentPassword.password}</p>
                        )}
                    </div>
                    <div className="buttons">
                        <ShowButton showCheck={showCheckLogin} setShowCheck={setShowCheckLogin}/>
                        <ChangePasswordParamButton paramForChange={"login"}/>
                    </div>
                </div>
                <div className="passwordP">
                    <div>
                        <p>Пароль</p>
                        {!showCheckPassword ? (
                            <p>* * * * * * *</p>
                        ) : (
                            <p>{currentPassword.password}</p>
                        )}
                    </div>
                    <div className="buttons">
                        <ShowButton showCheck={showCheckPassword} setShowCheck={setShowCheckPassword}/>
                        <ChangePasswordParamButton paramForChange={"password"}/>
                    </div>
                </div>
            </div>
        </>
    )
}