import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import { ImCheckmark, ImCross } from 'react-icons/im';
import FadeIn from 'react-fade-in/lib/FadeIn';

function MyTable(props) {
  const [language1, setLanguage1] = useState([]);
  const [language2, setLanguage2] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [checkArray, setCheckArray] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  const [currentValueArray, setCurrentValueArray] = useState([]);

  useEffect(() => {
    let la = props.langs.split('_');
    setLanguage1(la[0]);
    setLanguage2(la[1]);
    setSelectedWords(props.selectedLangWords);
  }, [props.langs, props.selectedLangWords]);

  useEffect(() => {
    const initializeArrayForChecking = (array) => {
      let arr = [];
      for (const i of array) {
        arr.push(false);
      }
      // Set array for text values:
      let a = [];
      for (const i of array) {
        a.push('');
      }
      setCurrentValueArray(a);
      return arr;
    };
    setCheckArray(initializeArrayForChecking(props.selectedLangWords));
    if (props.resetTable === true) {
      setCheckAnswers(false);
      props.setResetTable(false);
    }
  }, [props.selectedLangWords, props.resetTable, props]);

  const handleChange = (e, word, index) => {
    e.preventDefault();
    let w = Array.from(currentValueArray);
    w[index] = e.target.value;
    setCurrentValueArray(w);
    if (word[language2].toLowerCase() === e.target.value.toLowerCase()) {
      setToCorrect(index);
    } else {
      setToWrong(index);
    }
  };

  const setToCorrect = (index) => {
    let arr = Array.from(checkArray);
    for (const [i, v] of arr.entries()) {
      if (i === index) {
        arr[i] = true;
      }
    }
    setCheckArray(arr);
  };

  const setToWrong = (index) => {
    let arr = Array.from(checkArray);
    for (const [i, v] of arr.entries()) {
      if (i === index) {
        arr[i] = false;
      }
    }
    setCheckArray(arr);
  };

  const amountOfRight = () => {
    let right = 0;
    for (const i of checkArray) {
      if (i === true) {
        right++;
      }
    }
    return right;
  };

  const handleCheck = () => {
    setRightAnswersAmount(amountOfRight);
    setCheckAnswers(true);
  };

  const handleReset = () => {
    props.setResetTable(true);
  };

  return (
    <div id="mytable">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{language1}</th>
            <th>{language2}</th>
          </tr>
        </thead>
        <tbody>
          {selectedWords.map((word, index) => (
            <tr key={index}>
              <td id="word">{word[language1]}</td>
              <td>
                {' '}
                <InputGroup>
                  <FormControl
                    type="text"
                    value={currentValueArray[index]}
                    onChange={(e) => handleChange(e, word, index)}
                  />
                  {checkAnswers && (
                    <>
                      {checkArray[index] && (
                        <FadeIn>
                          <ImCheckmark
                            style={{
                              visibility: checkArray[index]
                                ? 'visible'
                                : 'hidden',
                            }}
                            id="check"
                          />
                        </FadeIn>
                      )}
                      {!checkArray[index] && (
                        <FadeIn>
                          <ImCross
                            style={{
                              visibility: !checkArray[index]
                                ? 'visible'
                                : 'hidden',
                            }}
                            id="cross"
                          />
                        </FadeIn>
                      )}
                    </>
                  )}
                </InputGroup>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {props.selected && (
        <Row id="check-row">
          {checkAnswers && (
            <>
              <Col id="result">
                <h6>
                  Result: {rightAnswersAmount} / {checkArray.length}{' '}
                </h6>
              </Col>
              <Col xs={3}>
                <Button size="sm" variant="dark" onClick={() => handleReset()}>
                  Try again
                </Button>
              </Col>
            </>
          )}
          <Col>
            <Button size="sm" variant="success" onClick={() => handleCheck()}>
              CHECK
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default MyTable;
