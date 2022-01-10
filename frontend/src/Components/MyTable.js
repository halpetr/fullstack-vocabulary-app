import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Table } from 'react-bootstrap';
import { ImCheckmark, ImCross } from 'react-icons/im';

function MyTable(props) {
  const [language1, setLanguage1] = useState([]);
  const [language2, setLanguage2] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [checkArray, setCheckArray] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  console.log(props.langs);
  console.log(checkArray);

  useEffect(() => {
    let la = props.langs.split('_');
    console.log(la);
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
      console.log(arr, props.selectedLangWords.length);
      return arr;
    };
    setCheckArray(initializeArrayForChecking(props.selectedLangWords));
  }, [props.selectedLangWords]);

  const handleChange = (e, word, index) => {
    e.preventDefault();
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
    console.log('arr', arr);
    setCheckArray(arr);
  };

  const setToWrong = (index) => {
    let arr = Array.from(checkArray);
    for (const [i, v] of arr.entries()) {
      if (i === index) {
        arr[i] = false;
      }
    }
    console.log('arr', arr);
    setCheckArray(arr);
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
                    onChange={(e) => handleChange(e, word, index)}
                  />
                  {checkAnswers && (
                    <>
                      {checkArray[index] && (
                        <ImCheckmark
                          style={{
                            visibility: checkArray[index]
                              ? 'visible'
                              : 'hidden',
                          }}
                          id="check"
                        />
                      )}
                      {!checkArray[index] && (
                        <ImCross
                          style={{
                            visibility: !checkArray[index]
                              ? 'visible'
                              : 'hidden',
                          }}
                          id="cross"
                        />
                      )}
                    </>
                  )}
                </InputGroup>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div id="check-btn">
        <Button variant="dark" onClick={() => setCheckAnswers(true)}>
          CHECK
        </Button>
      </div>
    </div>
  );
}

export default MyTable;
