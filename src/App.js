import React, { useState } from 'react';
import './App.scss';

import { evaluate } from 'mathjs';

import DisplayContainer from './display-container/display-container.component';
import RefText from './RefText';


const App = () => {
  const [upperDisplay, setUpperDisplay] = useState('');
  const [lowerDisplay, setLowerDisplay] = useState('0');
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [resultDisplay, setResultDisplay] = useState('');

  const displayValue = (value) => {
    const operators = ['+', '-', '/', '*'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return setLowerDisplay(prevLower => {
      // if a result has been gotten
      if(isEvaluated) {
        // if next input is a number
        if(numbers.includes(value)) {
          setUpperDisplay(value);
          setIsEvaluated(false);
          return value;
        }

        // if next input is an operator
        if(operators.includes(value)) {
          setUpperDisplay(`${resultDisplay}${value}`);
          setIsEvaluated(false);
          return value;
        }

        //if next input is a dot
        if(value === '.') {
          setUpperDisplay('0.');
          setIsEvaluated(false);
          return '0.'
        }
      };

      // if current lower display length is 20 already
      if(numbers.includes(value) && prevLower.length >= 20) {
        setUpperDisplay(prevUpper => prevUpper);
        setIsEvaluated(false);
        return prevLower;
      }

      // if value is a number or operator and the initial state is 0
      if( (numbers.includes(value) || operators.includes(value) ) && prevLower === '0') {
        setUpperDisplay(value);
        setIsEvaluated(false);
        return value;
      };

      // if value is a number and initial state is not 0
      if(numbers.includes(value) && prevLower !== '0') {
        setUpperDisplay(prevUpper => `${prevUpper}${value}`);
        setIsEvaluated(false);
        if(operators.includes(prevLower)) return value;
        return `${prevLower}${value}`;
      }

      // if value is an operator and initial state is not 0
      if(operators.includes(value) && prevLower !== '0') {
        // let newValue = `${prevLower}${value}`;
        if(operators.includes(prevLower)) {
          setUpperDisplay(prevUpper => prevUpper);
          setIsEvaluated(false);
          return prevLower;
        }

        setUpperDisplay(prevUpper => `${prevUpper}${value}`);
        setIsEvaluated(false);
        return value;
      }

      // if value is a dot and initial state is 0
      if(value === '.' && prevLower === '0') {
        setUpperDisplay('0.');
        setIsEvaluated(false);
        return '0.';
      }

      // if value is a dot and initial state is not 0
      if(value === '.' && prevLower !== '0') {
        // setUpperDisplay(prevUpper => `${prevUpper}${value}`);
        setIsEvaluated(false);

        if(operators.includes(prevLower)) {
          setUpperDisplay(prevUpper => `${prevUpper}0${value}`);
          return `0${value}`;
        }

        if(prevLower === '0.' || prevLower.includes('.') ) {
          setUpperDisplay(prevUpper => prevUpper)
          return prevLower;
        }

        setUpperDisplay(prevUpper => `${prevUpper}${value}`);
        return `${prevLower}${value}`;

      }

    });
  };

  const displayResult = () => {
    const operators = ['+', '-', '/', '*'];

    return setUpperDisplay(prevUpper => {
      let expression;
      if(operators.includes(prevUpper[prevUpper.length-1])) {
        expression = prevUpper.substring(0, prevUpper.length-1);
      } else {
        expression = prevUpper.substring(0);
      }

      let result = evaluate(expression);
      setLowerDisplay(result);
      setIsEvaluated(true);
      setResultDisplay(result);
      return `${expression}=${result}`;
    });
  };

  const resetDisplay = () => {
    setUpperDisplay('');
    setLowerDisplay('0');
    setIsEvaluated(false);
    setResultDisplay('');
  };


  return (
    <div className="page-wrapper">
      <DisplayContainer 
      upperDisplay={upperDisplay}
      lowerDisplay={lowerDisplay}
      displayValue={displayValue}  
      displayResult={displayResult}
      resetDisplay={resetDisplay}
      />

      <RefText name='Egbedokun Olayinka' />
    </div>
    
  )
}

export default App;

