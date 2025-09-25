import "./passwords.css";

import {motion} from "framer-motion";

import {useState, useEffect} from "react";

import {useSelector, useDispatch} from 'react-redux';

import PasswordInfo from "../components/password info/PasswordInfo.tsx";
import Header from "../../../UI components/for header/header/Header.tsx";
import PasswordsList from "../components/passwords list/PasswordsList.tsx";
import NoPasswordsWarning from "../components/no passwords warning/NoPasswordsWarning.tsx";

export default function Passwords() {

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);
    const passwords = useSelector((state:any) => state.passwords);

    const [showCheckLogin, setShowCheckLogin] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);

    const hideInformationFunction = () => {
        setShowCheckLogin(false);
        setShowCheckPassword(false);
    }

    const getFavorites = async() => {
        fetch("http://localhost:3000/info/getfavorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: localStorage.getItem("username")}),
        })
            .then(res => res.json())
            .then(data => {
                dispatch({type: "SET_FAVORITES", payload: data});
            })
    }

    const [themeStyle, setThemeStyle] = useState("passwordsMainDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("passwordsMainDark");
        } else {
            setThemeStyle("passwordsMainLight");
        }
    }, [theme])

    useEffect(() => {
        getFavorites();
    }, [])

    return (
        <>
            <div className={themeStyle}>
                <div className="passwordsDark">
                    <Header/>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 2}}
                        className="title"
                    >
                        <div className="mainContent">
                            {passwords.length === 0 ? (
                                <div className="warning">
                                    <NoPasswordsWarning/>
                                </div>
                            ) : (
                                <div className='main'>
                                    <PasswordsList hideInfoFunction={hideInformationFunction} passwords={passwords} setShowCheckLogin={setShowCheckLogin} setShowCheckPassword={setShowCheckPassword}/>
                                    <PasswordInfo showCheckLogin={showCheckLogin} setShowCheckLogin={setShowCheckLogin}
                                                  showCheckPassword={showCheckPassword}
                                                  setShowCheckPassword={setShowCheckPassword}/>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
