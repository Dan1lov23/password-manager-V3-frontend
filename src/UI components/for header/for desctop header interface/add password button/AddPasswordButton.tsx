import "./addPasswordButton.css";

import * as React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';

import {useDispatch, useSelector} from "react-redux";

import {useEffect, useState} from "react";

interface FadeProps {
    children: React.ReactElement<any>;
    in?: boolean;
    onClick?: any;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onExited?: (node: HTMLElement, isAppearing: boolean) => void;
    ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null as any, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null as any, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddPasswordButton() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const [checkError, setCheckError] = useState<string>("");

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("addPasswordButtonDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("addPasswordButtonDark");
        } else {
            setThemeStyle("addPasswordButtonLight");
        }
    }, [theme])

    const openModalWindow = () => {
        setCheckError('');
        handleOpen();
    }

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

    const checkFunction = () => {

        const serviceName = document.getElementById('serviceName') as HTMLInputElement;
        const login = document.getElementById('login') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const repeatPassword = document.getElementById('passwordRepeat') as HTMLInputElement;

        if (serviceName.value.length === 0) {
            return('Введите название сервиса');
        }

        if (login.value.length === 0) {
            return('Введите логин');
        }

        if (password.value.length === 0) {
            return('Введите пароль');
        }

        if (repeatPassword.value.length === 0) {
            return('Повторите пароль');
        }

        if (password.value !== repeatPassword.value) {
            return('Пароли не совпадают');
        }

        if (serviceName.value.length >= 16) {
            return('Имя сервиса должно быть меньше 16 символов');
        }

        if (login.value.length >= 16) {
            return('Логин должен быть меньше 16 символов');
        }

        if (password.value.length >= 16) {
            return('Пароль должен быть меньше 16 символов');
        }

        return ""

    }

    const addPasswordFunction = async() => {

        const check = checkFunction();

        const serviceName = document.getElementById('serviceName') as HTMLInputElement;
        const login = document.getElementById('login') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        if (check.length === 0) {
            fetch('http://localhost:3000/passwords/addPassword', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({serviceName: serviceName.value, login: login.value, password: password.value, username: localStorage.getItem("username"), passwordId: Date.now()})
            })
            .then(res => res.json())
            getPasswords();
            handleClose();
        } else {
            setCheckError(check);
        }
    }

    return (
        <div className={themeStyle}>
            <button onClick={() => openModalWindow()}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div style={{textAlign: "center"}}>
                            <p style={{
                                color: "var(--background-color)",
                                fontSize: "30px",
                                fontWeight: "var(--font-weight)"
                            }}>Добавить пароль</p>
                            <div style={{textAlign: "left"}}>
                                <p style={{
                                    marginLeft: "45px",
                                    color: "var(--background-color)",
                                    fontSize: "20px",
                                    fontWeight: "var(--font-weight)"
                                }}>Имя сервиса</p>
                            </div>
                            <input style={{width: "300px", height: "25px", marginTop: "20px"}}
                                   placeholder="Введите название сервиса" id="serviceName"/>
                            <div style={{textAlign: "left"}}>
                                <p style={{
                                    marginLeft: "45px",
                                    color: "var(--background-color)",
                                    fontSize: "20px",
                                    fontWeight: "var(--font-weight)"
                                }}>Логин</p>
                            </div>
                            <input style={{width: "300px", height: "25px", marginTop: "20px"}} placeholder="Введите логин"
                                   id="login"/>
                            <div style={{textAlign: "left"}}>
                                <p style={{
                                    marginLeft: "45px",
                                    color: "var(--background-color)",
                                    fontSize: "20px",
                                    fontWeight: "var(--font-weight)"
                                }}>Пароль</p>
                            </div>
                            <input style={{width: "300px", height: "25px", marginTop: "20px"}}
                                   placeholder="Введите пароль" id="password"/>
                            <div style={{textAlign: "left"}}>
                                <p style={{
                                    marginLeft: "45px",
                                    color: "var(--background-color)",
                                    fontSize: "20px",
                                    fontWeight: "var(--font-weight)"
                                }}>Повторение пароля</p>
                            </div>
                            <input style={{width: "300px", height: "25px", marginTop: "20px"}}
                                   placeholder="Повторите пароль" id="passwordRepeat"/>
                            <div>
                                {checkError.length > 0 ? (
                                    <p style={{
                                        color: "var(--red-color)",
                                        fontSize: "30px",
                                        fontWeight: "var(--font-weight)"
                                    }}>{checkError}</p>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <button style={{
                                width: "310px",
                                height: "40px",
                                marginTop: "20px",
                                backgroundColor: "var(--background-color)",
                                color: "var(--text-color)",
                                fontSize: "25px",
                                border: "none",
                                borderRadius: "var(--radius)"
                            }} onClick={() => addPasswordFunction()}>
                                Generate
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
