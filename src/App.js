// CalculatorApp.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalculatorApp.css'; // Import your custom CSS file
import * as math from 'mathjs';


const CalculatorApp = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const buttonRefs = useRef([]);

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleClearResult = () => {
    setResult('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input);
      setResult(result.toString());
    } catch (error) {
      setResult('Error');
    }
  };
  

  const handleOperator = (operator) => {
    const lastChar = input.slice(-1);
    if (operators.includes(lastChar)) {
      setInput((prevInput) => prevInput.slice(0, -1) + operator);
    } else {
      setInput((prevInput) => prevInput + operator);
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;

      if (key >= '0' && key <= '9') {
        handleButtonClick(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
      } else if (key === 'Shift' || key === '=') {
        handleCalculate();
      } else if (key === 'c' || key === 'C') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        handleArrowNavigation(key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, );

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, 0); // clear the array
    // populate the array with references to the buttons
    for (let i = 0; i < 16; i++) {
      buttonRefs.current.push(React.createRef());
    }
  }, []);

  const operators = ['+', '-', '*', '/'];

  const handleArrowNavigation = (key) => {
    const currentButtonIndex = buttonRefs.current.findIndex((ref) => ref.current === document.activeElement);
    let nextButtonIndex = currentButtonIndex;

    switch (key) {
      case 'ArrowUp':
        nextButtonIndex -= 4;
        break;
      case 'ArrowDown':
        nextButtonIndex += 4;
        break;
      case 'ArrowLeft':
        nextButtonIndex -= 1;
        break;
      case 'ArrowRight':
        nextButtonIndex += 1;
        break;
      default:
        break;
    }

    // Ensure the next index is within bounds
    nextButtonIndex = Math.min(Math.max(nextButtonIndex, 0), buttonRefs.current.length - 1);

    if (buttonRefs.current[nextButtonIndex] && buttonRefs.current[nextButtonIndex].current) {
      buttonRefs.current[nextButtonIndex].current.focus();
    }
  };

  return (
    <div>
      <h1 className="calculator-title">Calculator</h1>
    <Container className="calculator-container">
      <Row>
        <Col>
          <Form.Control
            type="text"
            value={input}
            onChange={handleInputChange}
            className="calculator-input"
          />
          <div className="calculator-result">Result: {result}</div>
        </Col>
      </Row>
      <Row>
        {[7, 8, 9, '/'].map((value, index) => (
          <Col key={value}>
            <Button
              variant="outline-secondary"
              className="calculator-button"
              onClick={() => handleButtonClick(value)}
              ref={buttonRefs.current[index]}
            >
              {value}
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        {[4, 5, 6, '*'].map((value, index) => (
          <Col key={value}>
            <Button
              variant="outline-secondary"
              className="calculator-button"
              onClick={() => handleButtonClick(value)}
              ref={buttonRefs.current[index + 4]}
            >
              {value}
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        {[1, 2, 3, '-'].map((value, index) => (
          <Col key={value}>
            <Button
              variant="outline-secondary"
              className="calculator-button"
              onClick={() => handleButtonClick(value)}
              ref={buttonRefs.current[index + 8]}
            >
              {value}
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        {[0, 'C', '=', '+'].map((value, index) => (
          <Col key={value}>
            <Button
              variant={value === '=' ? 'outline-danger' : 'outline-secondary'}
              className={`calculator-button ${value === '=' ? 'equals-button' : ''}`}
              onClick={
                value === 'C'
                  ? handleClear
                  : value === '='
                  ? handleCalculate
                  : () => handleButtonClick(value)
              }
              ref={buttonRefs.current[index + 12]}
            >
              {value}
            </Button>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-secondary"
            className="calculator-button-clear"
            onClick={handleClearResult}
          >
            Clear Result
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CalculatorApp;