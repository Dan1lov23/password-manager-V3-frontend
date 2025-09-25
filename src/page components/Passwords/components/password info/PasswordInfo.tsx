import "./passwordInfo.css";

import {useSelector} from "react-redux";
import {type SetStateAction, useEffect, useState} from "react";

import type {Dispatch} from "react";

import ShowButton from "../show button/ShowButton.tsx";
import PasswordInfoTitle from "../password info title/PasswordInfoTitle.tsx";
import DeletePasswordButton from "../delete password button/DeletePasswordButtonn.tsx";
import ChangePasswordParamButton from "../change password param button/ChangePasswordParamButton.tsx";
import PasswordInfoMobileInterface from "../password info mobile interface/PasswordInfoMobileInterface.tsx";

export default function PasswordInfo({showCheckLogin, setShowCheckLogin, showCheckPassword, setShowCheckPassword}:{showCheckLogin: boolean, setShowCheckLogin:Dispatch<SetStateAction<boolean>>, showCheckPassword: boolean, setShowCheckPassword:Dispatch<SetStateAction<boolean>>}) {

    const theme = useSelector((state:any) => state.theme);
    const currentPassword = useSelector((state:any) => state.currentPassword);

    const [themeStyle, setThemeStyle] = useState("passwordInfoDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordInfoDark");
        } else {
            setThemeStyle("passwordInfoLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                {currentPassword.length === 0 ? (
                    <div></div>
                ) : (
                    <div className="info">
                        <div className="desktop">
                            <PasswordInfoTitle serviceName={currentPassword.serviceName} />
                            <div className="loginPart">
                                <p>Логин</p>
                                <div className="loginAndShowButton">
                                    {showCheckLogin ? (
                                        <div>
                                            <p className="passwordP">{currentPassword.login}</p>
                                        </div>
                                    ) : (
                                        <p className="passwordP">* * * * * *</p>
                                    )}
                                    <div className="buttons">
                                        <ShowButton showCheck={showCheckLogin} setShowCheck={setShowCheckLogin}/>
                                        <ChangePasswordParamButton paramForChange={"login"}/>
                                    </div>
                                </div>
                            </div>
                            <div className="passwordPart">
                                <p>Пароль</p>
                                <div className="passwordAndShowButton">
                                    {showCheckPassword ? (
                                        <p className="passwordP">{currentPassword.password}</p>
                                    ) : (
                                        <p className="passwordP">* * * * * *</p>
                                    )}
                                    <div className="buttons">
                                        <ShowButton showCheck={showCheckPassword} setShowCheck={setShowCheckPassword}/>
                                        <ChangePasswordParamButton paramForChange={"password"}/>
                                    </div>
                                </div>
                            </div>
                            <DeletePasswordButton passwordId={currentPassword.passwordId} />
                        </div>
                        <div className="mobile">
                            <PasswordInfoMobileInterface currentPassword={currentPassword} showCheckLogin={showCheckLogin} setShowCheckLogin={setShowCheckLogin} showCheckPassword={showCheckPassword} setShowCheckPassword={setShowCheckPassword}/>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}