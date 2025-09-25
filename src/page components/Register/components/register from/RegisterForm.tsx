import "./registerForm.css";

import {useNavigate} from "react-router-dom";

import {useState} from "react";

import validatePassword from "../../../../code modules/validate password/validatePassword.ts";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [error, setError] = useState<any>("");

    const registerFunction = async () => {

        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const passwordRepeat = document.getElementById("passwordRepeat") as HTMLInputElement;

        if (password.value !== passwordRepeat.value) {
            setError('Password not match');
        } else if (username.value.length === 0) {
            setError('Enter username');
        } else if (validatePassword(password.value) !== true) {
            setError(validatePassword(password.value))
        } else {
            setError('');
            fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({username: username.value, password: password.value})
            })
                .then(res => res.json())
                .then(data => {
                    if (data.marker === false) {
                        setError(data.error);
                    } else {
                        navigate("/login");
                    }
                })
        }
    };

    return (
        <>
            <div className="registerForm">
                <div className="registerTitle">
                    <p>Регистрация</p>
                </div>
                <div className="registerInput">
                    <div className="marker">
                        <p>Логин</p>
                    </div>
                    <input placeholder="введите логин" id="username"/>
                </div>
                <div className="registerInput">
                    <div className="marker">
                        <p>Пароль</p>
                    </div>
                    <input placeholder="введите пароль" id="password"/>
                </div>
                <div className="registerInput">
                    <div className="marker">
                        <p>Повторите пароль</p>
                    </div>
                    <input placeholder="повторите пароль" type="password" id="passwordRepeat"/>
                </div>
                <div className="error">
                    {error.length > 0 ? (
                        <p style={{fontSize: "17px", color: "red"}}>{error}</p>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="registerButton">
                    <button onClick={() => registerFunction()}>
                        Зарегестрироваться
                    </button>
                </div>
                <div className="linkToLogin">
                    <div className="title">
                        <p>У вас есть аккаунт?</p>
                    </div>
                    <div className="link">
                        <p onClick={() => navigate("/login")}>Войдите</p>
                    </div>
                </div>
            </div>
        </>
    )
}
