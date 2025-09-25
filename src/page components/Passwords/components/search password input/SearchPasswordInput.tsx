import "./searchPasswordInput.css";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {type SetStateAction, useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import type {Dispatch} from "react";
import type {Password} from "../../../../interfaces/PasswordInterface.ts";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

import getAllServiceNames from "../../../../code modules/get all service names/getAllServiceNames.ts"

export default function SearchPasswordInput({searchArray, setShowCheckPassword, setShowCheckLogin}:{searchArray:[Password], setShowCheckPassword:Dispatch<SetStateAction<boolean>>, setShowCheckLogin: Dispatch<SetStateAction<boolean>>}) {

    const dispatch = useDispatch();

    const theme = useSelector((state:any) => state.theme);

    const [themeStyle, setThemeStyle] = useState("searchPasswordInputDark");
    const [allServiceNamesArray, setAllServiceNamesArray] = useState<string[]>([]);

    const searchPasswordFunction = () => {
        const passwordForSearch = document.getElementById("passwordForSearch") as HTMLInputElement;
        for (let a = 0; a < searchArray.length; a++) {
            if (searchArray[a].serviceName === passwordForSearch.value) {
                dispatch({type: "SET_CURRENT_PASSWORD", payload: searchArray[a]});
                setShowCheckPassword(false);
                setShowCheckLogin(false);
            }
        }
    }

    useEffect(() => {
        if (theme === "dark") {
            setThemeStyle("searchPasswordInputDark");
        } else {
            setThemeStyle("searchPasswordInputLight");
        }
    }, [theme])

    useEffect(() => {
        setAllServiceNamesArray(getAllServiceNames(searchArray));
    }, [searchArray]);

    useEffect(() => {
        setAllServiceNamesArray(getAllServiceNames(searchArray));
    }, [])

    return (
        <div className={themeStyle}>
            {themeStyle === "searchPasswordInputDark" ? (
                <Autocomplete
                    disablePortal
                    options={allServiceNamesArray}
                    id="passwordForSearch"
                    sx={{
                        width: 300,
                        borderRadius: "10px",
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '2px solid var(--text-color)',
                            },
                            outline: '2px solid var(--text-color)',
                        },
                        '& input': {
                            outline: 'none',
                        }
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            ) : (
                <Autocomplete
                    disablePortal
                    options={allServiceNamesArray}
                    id="passwordForSearch"
                    sx={{
                        width: 300,
                        borderRadius: "10px",
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '2px solid var(--black-color)',
                            },
                            outline: '2px solid var(--black-color)',
                        },
                        '& input': {
                            outline: 'none',
                        }
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
            )}
            <button onClick={() => searchPasswordFunction()}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
}
