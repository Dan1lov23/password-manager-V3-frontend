import "./favoriteButton.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import type {Password} from "../../../../interfaces/PasswordInterface.ts";

export default function FavoriteButton({password}:{password:Password}) {

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);
    const favorites = useSelector((state:any) => state.favorites);

    const [themeStyle, setThemeStyle] = useState("favoriteButtonDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("favoriteButtonDark");
        } else {
            setThemeStyle("favoriteButtonLight");
        }
    }, [theme])

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

    const heartCheckFunction = () => {
        const checkArray = [];
        for (let a = 0; a < favorites.length; a++) {
            checkArray.push(favorites[a].passwordId);
        }
        for (let a = 0; a < checkArray.length; a++) {
            if (checkArray[a] === password.passwordId) {
                return true;
            }
        }
        return false;
    }

    const favoriteCheckFunction = async() => {
        fetch('http://localhost:3000/favorites/checkFavoriteFunction', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                serviceName: password.serviceName,
                login: password.login,
                password: password.password,
                username: password.username,
                passwordId: password.passwordId,
                fullPassword: password,
            })
        })
        getFavorites();
    }


    useEffect(() => {
        getFavorites();
    }, [])

    return (
        <>
            <div className={themeStyle}>
                {heartCheckFunction() ? (
                    <p className="current" onClick={() => favoriteCheckFunction()}>
                        <FontAwesomeIcon icon={faStar} color="var(--gold-color)"/>
                    </p>
                ) : (
                    <p className="default" onClick={() => favoriteCheckFunction()}>
                        <FontAwesomeIcon icon={faStar}/>
                    </p>
                )}
            </div>
        </>
    )
}