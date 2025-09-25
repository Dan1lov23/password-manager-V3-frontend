import "./app.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import Home from "../page components/Home/page/Home.tsx";
import Login from "../page components/Login/page/Login.tsx";
import Register from "../page components/Register/page/Register.tsx";
import Passwords from "../page components/Passwords/page/Passwords.tsx";
import Favorites from "../page components/Favorites/page/Favorites.tsx";

export default function App() {

    const dispatch = useDispatch();

    const passwords = useSelector((state:any) => state.passwords);
    const currentPassword = useSelector((state:any) => state.currentPassword);

    const getPasswords = async() => {
        fetch("http://localhost:3000/info/getPasswords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: localStorage.getItem("username")}),
        })
            .then(res => res.json())
            .then(data => {
                dispatch({type: "SET_PASSWORDS", payload: data});
            })
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

    useEffect(() => {
        getPasswords();
        getFavorites();
    }, []);

    useEffect(() => {
        for (let a = 0; a < passwords.length; a++) {
            if (passwords[a].passwordId === currentPassword.passwordId) {
                dispatch({type: "SET_CURRENT_PASSWORD", payload: passwords[a]});
            }
        }
    }, [passwords])

    return (
        <>
            <div className="app">
                <BrowserRouter>
                    {localStorage.getItem("isLogin") === "true" ? (
                        <div>
                            <Routes>
                                <Route path="/" element={<Home/>} />
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/passwords" element={<Passwords/>}/>
                                <Route path="/favorites" element={<Favorites/>}/>
                            </Routes>
                        </div>
                    ) : (
                        <div>
                            <Routes>
                                <Route path="/" element={<Home/>} />
                                <Route path="/login" element={<Login/>} />
                                <Route path="/register" element={<Register/>} />
                            </Routes>
                        </div>
                    )}
                </BrowserRouter>
            </div>
        </>
    )
}