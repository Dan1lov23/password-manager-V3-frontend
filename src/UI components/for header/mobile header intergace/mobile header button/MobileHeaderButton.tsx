import "./mobileHeaderButton.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faList, faStar, faUnlock, faX} from "@fortawesome/free-solid-svg-icons";

import GeneratePasswordButton from "../../for desctop header interface/generate password button/GeneratePasswordButton.tsx";
import AddPasswordButton from "../../for desctop header interface/add password button/AddPasswordButton.tsx";
import LogoutButton from "../../for desctop header interface/logout button/LogoutButton.tsx";

export default function MobileHeaderButton() {

    const [open, setOpen] = React.useState(false);

    const theme = useSelector((state:any) => state.theme);
    const [themeStyle, setThemeStyle] = useState("mobileHeaderInterfaceButtonDark");

    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("mobileHeaderInterfaceButtonDark");
        } else {
            setThemeStyle("mobileHeaderInterfaceButtonLight");
        }
    }, [theme])

    const DrawerList = (
        <Box sx={{ width: '100%', height: '100vh'}} role="presentation">
            <List style={{textAlign: "right", marginRight: "40px"}}>
                <FontAwesomeIcon icon={faX} fontSize="40px" onClick={toggleDrawer(false)}/>
            </List>
            <Divider />
            <List>
                <div style={{textAlign: "left", margin: "5px"}}>
                    <div className="listIcon" style={{
                        marginTop: "20px",
                    }}>
                        <p style={{fontSize: "40px"}} onClick={() => navigate("/")}><FontAwesomeIcon icon={faHome}/></p>
                    </div>
                    <div className="listIcon" style={{
                        marginTop: "20px",
                    }}>
                        <p style={{fontSize: "40px"}} onClick={() => navigate("/passwords")}><FontAwesomeIcon
                            icon={faUnlock}/></p>
                    </div>
                    <div className="listIcon" onClick={() => navigate("/favorites")} style={{
                        marginTop: "20px",
                    }}>
                        <p style={{fontSize: "40px"}}><FontAwesomeIcon icon={faStar}/></p>
                    </div>
                </div>
                <div style={{textAlign: "left", margin: "10px"}}>
                    <div style={{
                        marginTop: "20px",
                    }}>
                        <AddPasswordButton/>
                    </div>
                    <div style={{
                        marginTop: "20px",
                    }}>
                        <GeneratePasswordButton/>
                    </div>
                    <div style={{
                        marginTop: "20px",
                    }}>
                        <LogoutButton/>
                    </div>
                </div>
            </List>
        </Box>
    );

    return (
        <div className={themeStyle}>
            <p onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faList}/>
            </p>
            <Drawer
                anchor="top"
                open={open}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
