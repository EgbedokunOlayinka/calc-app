import React from 'react';
import './display-container.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const DisplayContainer = ({ upperDisplay, lowerDisplay, displayValue, displayResult, resetDisplay }) => {

    const renderButton = (value, classProp, char, mainFunc) => {
        return (
        <CustomButton classProp={classProp} value={value} mainFunc={mainFunc}>
            { char }
        </CustomButton>
        )
    }  

    return (
        <div className="container">
            <p className="upper-display">
                { upperDisplay }
            </p>
            <p className="lower-display">
                { lowerDisplay }
            </p>

            <div className="sub-container">
                { renderButton('AC', 'reset red', 'AC', resetDisplay) }
                { renderButton('/', 'divide light', '/', displayValue) }
                { renderButton('*', 'multiply light', 'X', displayValue) }
                { renderButton('7', 'seven dark', '7', displayValue) }
                { renderButton('8', 'eight dark', '8', displayValue) }
                { renderButton('9', 'nine dark', '9', displayValue) }
                { renderButton('-', 'minus light', '-', displayValue) }
                { renderButton('4', 'four dark', '4', displayValue) }
                { renderButton('5', 'five dark', '5', displayValue) }
                { renderButton('6', 'six dark', '6', displayValue) }
                { renderButton('+', 'plus light', '+', displayValue) }
                { renderButton('1', 'one dark', '1', displayValue) }
                { renderButton('2', 'two dark', '2', displayValue) }
                { renderButton('3', 'three dark', '3', displayValue) }
                { renderButton('=', 'equals blue', '=', displayResult) }
                { renderButton('0', 'zero dark', '0', displayValue) }
                { renderButton('.', 'dot dark', '.', displayValue) }
            </div>
        </div>
    )
}

export default DisplayContainer;
