import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, value, classProp, mainFunc }) => {
    return (
        <button className={classProp} onClick={() => mainFunc(value)}>
            { children }
        </button>
)
};

export default CustomButton;
