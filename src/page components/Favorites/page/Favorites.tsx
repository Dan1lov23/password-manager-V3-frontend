import "./favorites.css";

import {motion} from "framer-motion";

import {useState, useEffect} from "react";

import {useSelector, useDispatch} from 'react-redux';

import PasswordInfo from "../../Passwords/components/password info/PasswordInfo.tsx";
import Header from "../../../UI components/for header/header/Header.tsx";
import PasswordsList from "../../Passwords/components/passwords list/PasswordsList.tsx";
import NoFavoritesWarning from "../components/no favorites warning/NoFavoritesWarning.tsx";

export default function Passwords() {

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);
    const favorites = useSelector((state:any) => state.favorites);

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
                console.log("Избранное", data);
                dispatch({type: "SET_FAVORITES", payload: data});
            })
    }

    const [themeStyle, setThemeStyle] = useState("favoritesDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("favoritesDark");
        } else {
            setThemeStyle("favoritesLight");
        }
    }, [theme])

    useEffect(() => {
        getFavorites();
    }, [])

    return (
        <>
            <div className={themeStyle}>
                <Header/>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 2}}
                    className="title"
                >
                    <div className="mainContent">
                        {favorites.length === 0 ? (
                            <div className="warning">
                                <NoFavoritesWarning/>
                            </div>
                        ) : (
                            <div className='main'>
                                <PasswordsList setShowCheckLogin={setShowCheckLogin} setShowCheckPassword={setShowCheckPassword} hideInfoFunction={hideInformationFunction} passwords={favorites}/>
                                <PasswordInfo showCheckLogin={showCheckLogin} setShowCheckLogin={setShowCheckLogin}
                                              showCheckPassword={showCheckPassword}
                                              setShowCheckPassword={setShowCheckPassword}/>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    )
}
