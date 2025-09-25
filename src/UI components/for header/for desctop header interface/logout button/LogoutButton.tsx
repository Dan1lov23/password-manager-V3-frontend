import "./logoutButton.css";

import * as React from 'react';

import {useNavigate} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';
import {useSelector} from "react-redux";
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

export default function LogoutButton() {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("logoutButtonDark");

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("logoutButtonDark");
        } else {
            setThemeStyle("logoutButtonLight");
        }
    }, [theme])

    const logoutFunction = () => {
        localStorage.setItem("isLogin", "false");
        localStorage.setItem("userRole", "");
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        localStorage.setItem("ordersCounter", "");
        navigate("/login");
        window.location.reload();
    }

    return (
        <div className={themeStyle}>
            <button onClick={handleOpen}>
                <FontAwesomeIcon icon={faRightToBracket} />
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
                            <p style={{fontSize: "29px", color: "var(--background-color)"}}>Хотите выйти из аккаунта ?</p>
                            <button style={{
                                backgroundColor: 'var(--background-color)',
                                width: "200px",
                                height: "40px",
                                color: "white",
                                fontSize: "25px",
                                border: "none",
                                borderRadius: "10px",
                            }} onClick={() => logoutFunction()}>
                                Выйти
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
