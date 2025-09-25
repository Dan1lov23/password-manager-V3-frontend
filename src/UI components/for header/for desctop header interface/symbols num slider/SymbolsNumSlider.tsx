import "./symbolsNumSlider.css";

import {useState} from "react";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SymbolsNumSlider({setSymbolsCounter}:{setSymbolsCounter: (num:number) => void}) {

    const [numCounter, setNumCounter] = useState(0);

    function valuetext(value: number) {
        setNumCounter(value);
        setSymbolsCounter(value);
        return `${value}`;
    }


    return (
        <div className="symbolsNumSlider">
            <Box>
                <Slider
                    aria-label="Temperature"
                    defaultValue={10}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={1}
                    marks
                    min={1}
                    max={16}
                />
            </Box>
            <p>Количество символов - {numCounter}</p>
        </div>
    );
}
