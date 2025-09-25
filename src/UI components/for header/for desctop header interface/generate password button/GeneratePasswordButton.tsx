import "./generatePasswordButton.css";

import * as React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faKey} from '@fortawesome/free-solid-svg-icons';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import SymbolsNumSlider from "../symbols num slider/SymbolsNumSlider.tsx";
import generatePassword from "../../../../code modules/generate password/generatePassword.ts";

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

export default function GeneratePasswordButton() {

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("generatePasswordButtonDark");

    const [symbolsNum, setSymbolsNum] = useState<number>(10);

    const [password, setPassword] = useState("");

    const [warning, setWarning] = useState("");

    const [upperCaseLetterFlag, setUpperCaseLetterFlag] = useState(false);
    const [lowerCaseLetterFlag, setLowerCaseLetterFlag] = useState(false);
    const [numFlag, setNumFlag] = useState(false);
    const [specialLetterFlag, setSpecialLetterFlag] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const openModalWindow = () => {
        handleOpen();
        setPassword("");
    }

    const generatePasswordFunction = () => {

        if (!upperCaseLetterFlag && !lowerCaseLetterFlag && !numFlag && !specialLetterFlag) {
            setPassword("");
            setWarning("Выберите хотя бы один параметр");
            return;
        }

        setWarning("");
        setPassword(generatePassword(symbolsNum, upperCaseLetterFlag, lowerCaseLetterFlag, numFlag, specialLetterFlag));
    }

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("generatePasswordButtonDark");
        } else {
            setThemeStyle("generatePasswordButtonLight");
        }
    }, [theme])

    return (
        <div className={themeStyle}>
            <button onClick={() => openModalWindow()}>
                <FontAwesomeIcon icon={faKey} />
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
                        <div style={{display: "grid", justifyContent: "center"}}>
                            <p style={{
                                color: "var(--background-color)",
                                fontSize: "30px",
                                fontWeight: "var(--font-weight)",
                            }}>Сгенерировать пароль ?</p>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <div style={{
                                display: "grid",
                                justifyContent: "center",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                alignItems: "center"
                            }}>
                                <p style={{
                                    color: "var(--background-color)",
                                    fontSize: "17px",
                                    fontWeight: "var(--font-weight)"
                                }}>Специальные символы</p>
                                <input style={{height: "30px"}} type={"checkbox"} onChange={() => setSpecialLetterFlag(!specialLetterFlag)} />
                            </div>
                            <div style={{
                                display: "grid",
                                justifyContent: "center",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                alignItems: "center"
                            }}>
                                <p style={{
                                    color: "var(--background-color)",
                                    fontSize: "17px",
                                    fontWeight: "var(--font-weight)"
                                }}>Заглавные буквы</p>
                                <input style={{height: "30px"}} type={"checkbox"} onClick={() => setUpperCaseLetterFlag(!upperCaseLetterFlag)}/>
                            </div>
                            <div style={{
                                display: "grid",
                                justifyContent: "center",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                alignItems: "center"
                            }}>
                                <p style={{
                                    color: "var(--background-color)",
                                    fontSize: "17px",
                                    fontWeight: "var(--font-weight)"
                                }}>Строчные буквы</p>
                                <input style={{height: "30px"}} type={"checkbox"} onClick={() => setLowerCaseLetterFlag(!lowerCaseLetterFlag)}/>
                            </div>
                            <div style={{
                                display: "grid",
                                justifyContent: "center",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                alignItems: "center"
                            }}>
                                <p style={{
                                    color: "var(--background-color)",
                                    fontSize: "17px",
                                    fontWeight: "var(--font-weight)"
                                }}>Цифры</p>
                                <input style={{height: "30px"}} type={"checkbox"} onClick={() => setNumFlag(!numFlag)}/>
                            </div>
                            <SymbolsNumSlider setSymbolsCounter={setSymbolsNum}/>
                            {warning.length > 0 ? (
                                <p style={{
                                    color: "var(--red-color)",
                                    fontSize: "22px",
                                    fontWeight: "var(--font-weight)",
                                }}>{warning}</p>
                            ) : (
                                <p></p>
                            )}
                            <button
                                style={{
                                    width: "300px",
                                    height: "40px",
                                    color: "var(--text-color)",
                                    backgroundColor: "var(--background-color)",
                                    border: "none",
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    fontSize: "20px",
                                }}
                                onClick={() => generatePasswordFunction()}
                            >
                                Сгенерировать
                            </button>
                            <p style={{
                                color: "var(--background-color)",
                                fontSize: "30px",
                                fontWeight: "var(--font-weight)"
                            }}>{password}</p>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
