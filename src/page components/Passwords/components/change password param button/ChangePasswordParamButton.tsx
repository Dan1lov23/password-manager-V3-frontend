import "./changePasswordParamButton.css";

import * as React from 'react';

import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil} from "@fortawesome/free-solid-svg-icons";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';

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

export default function ChangePasswordParamButton({paramForChange}:{paramForChange:string}) {

    const dispatch = useDispatch();

    const currentPassword = useSelector((state:any) => state.currentPassword);
    const passwordParamForChange = useSelector((state:any) => state.passwordParamForChange);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = React.useState<string>("");

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("changePasswordParamButtonDark");

    const openModalWindow = () => {
        handleOpen();
        dispatch({type: "SET_PASSWORD_PARAM_FOR_CHANGE", payload: paramForChange});
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

    const checkFunction = (newParam:HTMLInputElement) => {
        if (newParam.value.length === 0) {
            return("Введите параметр для изменения");
        }
        return "";
    }

    const changePasswordParamFunction = async() => {
        const newParam = document.getElementById("newParam") as HTMLInputElement;
        const check = checkFunction(newParam);
        if (check.length === 0) {
            if (paramForChange === "login") {
                fetch('http://localhost:3000/passwords/changeLogin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({newLogin: newParam.value, passwordId: currentPassword.passwordId}),
                })
                getPasswords();
            } else if (paramForChange === "password") {
                fetch('http://localhost:3000/passwords/changePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({newPassword: newParam.value, passwordId: currentPassword.passwordId}),
                })
                getPasswords();
            }
            handleClose();
        } else {
            setError(checkFunction(newParam));
        }
    }

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("changePasswordParamButtonDark");
        } else {
            setThemeStyle("changePasswordParamButtonLight");
        }
    }, [theme])

    return (
        <div className={themeStyle}>
            <button onClick={() => openModalWindow()}>
                <FontAwesomeIcon icon={faPencil} />
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
                            {passwordParamForChange === "login" ? (
                                <p style={{fontSize: "29px", color: "var(--background-color)"}}>Сменить логин ?</p>
                            ) : (
                                <p style={{fontSize: "29px", color: "var(--background-color)"}}>Сменить пароль ?</p>
                            )}
                            <div>
                                {passwordParamForChange === "password" ? (
                                    <input type="text" placeholder="Введите новый пароль" id="newParam" style={{width: "220px", height: "25px", marginTop: "20px"}}/>
                                ) : (
                                    <input type="text" placeholder="Введите новый логин" id="newParam" style={{width: "220px", height: "25px", marginTop: "20px"}}/>
                                )}
                            </div>
                            <div>
                                {error.length > 0 ? (
                                    <p style={{fontSize: "29px", color: "var(--red-color)", marginTop: "100px"}}>{error}</p>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <button style={{
                                backgroundColor: 'var(--background-color)',
                                width: "230px",
                                height: "40px",
                                color: "white",
                                fontSize: "25px",
                                border: "none",
                                borderRadius: "10px",
                                marginTop: "50px"
                            }}
                            onClick={() => changePasswordParamFunction()}>
                                Имзенить
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
