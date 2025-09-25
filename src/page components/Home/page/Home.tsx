import "./home.css";

import {useSelector} from "react-redux";

import {useState, useEffect} from "react";

import Header from "../../../UI components/for header/header/Header.tsx";
import WelcomeTitle from "../components/welcome title/WelcomeTitle.tsx";
import NoAuthWarning from "../components/no auth warning/NoAuthWarning.tsx";

export default function Home() {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("homeDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("homeDark");
        } else {
            setThemeStyle("homeLight");
        }
    }, [theme])

    return (
        <>
            <div className={themeStyle}>
                {localStorage.getItem("isLogin") === "true" ? (
                    <div>
                        <Header/>
                        <div className="main">
                            <WelcomeTitle/>
                        </div>

                    </div>
                ) : (
                    <NoAuthWarning/>
                )}
            </div>
        </>
    )
}