import "./deletePasswordButton.css";

import * as React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

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

export default function DeletePasswordButton({passwordId}:{passwordId:number}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("deletePasswordButtonDark");

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

    const deletePasswordFunction = async() => {
        fetch('http://localhost:3000/passwords/deletePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: localStorage.getItem('username'), passwordId: passwordId}),
        })
        dispatch({type: "SET_CURRENT_PASSWORD", payload: []})
        getPasswords();
    }

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("deletePasswordButtonDark");
        } else {
            setThemeStyle("deletePasswordButtonLight");
        }
    }, [theme])

    return (
        <div className={themeStyle}>
            <button onClick={handleOpen}>
                <FontAwesomeIcon icon={faTrash} />
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
                            }}>Вы точно хотите удалить пароль ?</p>
                            <button style={{
                                width: "210px",
                                height: "40px",
                                marginTop: "20px",
                                backgroundColor: "var(--background-color)",
                                color: "var(--text-color)",
                                fontSize: "25px",
                                border: "none",
                                borderRadius: "var(--radius)"
                            }} onClick={() => deletePasswordFunction()}>
                                Удалить
                            </button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
