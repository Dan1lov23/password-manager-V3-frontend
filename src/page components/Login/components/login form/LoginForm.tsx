import "./loginForm.css";

import {useNavigate} from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();

    const loginFunction = async() => {

        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify({username: username.value, password: password.value})
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("userRole", data.userRole);
                localStorage.setItem("username", username.value);
                localStorage.setItem("password", password.value);
                localStorage.setItem("ordersCounter", data.ordersCounter);
                navigate("/");
                window.location.reload();
                setTimeout(() => {
                    localStorage.setItem("isLogin", "false");
                    localStorage.setItem("userRole", "");
                    localStorage.setItem("username", "");
                    localStorage.setItem("password", "");
                    localStorage.setItem("ordersCounter", "");
                    navigate("/login");
                }, 3600000)
            })
    }

    return (
        <>
            <div className="loginForm">
                <div className="loginTitle">
                    <p>Войти в аккаунт</p>
                </div>
                <div className="loginInput">
                    <div className="marker">
                        <p>Логин</p>
                    </div>
                    <input placeholder="введите логин" id="username"/>
                </div>
                <div className="loginInput">
                    <div className="marker">
                        <p>Пароль</p>
                    </div>
                    <input placeholder="введите пароль" id="password"/>
                </div>
                <div className="loginButton">
                    <button onClick={() => loginFunction()}>
                        Войти
                    </button>
                </div>
                <div className="linkToRegistration">
                    <div className="title">
                        <p>Нет аккаунта?</p>
                    </div>
                    <div className="link">
                        <p onClick={() => navigate("/register")}>Зарегестрируйтесь</p>
                    </div>
                </div>
            </div>
        </>
    )
}
