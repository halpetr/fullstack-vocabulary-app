import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Table } from 'react-bootstrap';
import { ImCheckmark } from 'react-icons/im';

function MyTable(props) {
  const [language1, setLanguage1] = useState([]);
  const [language2, setLanguage2] = useState([]);
  const [checkAnswers, setCheckAnswers] = useState(true);
  const [checkArray, setCheckArray] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  console.log(props.langs);

  useEffect(() => {
    let la = props.langs.split('_');
    console.log(la);
    setLanguage1(la[0]);
    setLanguage2(la[1]);
    setSelectedWords(props.selectedLangWords);
  }, [props.langs, props.selectedLangWords]);

  const handleChange = (e, word) => {
    e.preventDefault();
    if (word[language2].toLowerCase() === e.target.value.toLowerCase()) {
      console.log(true);
    }
  };

  return (
    <div>
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
                    onChange={(e) => handleChange(e, word)}
                  />
                  {checkAnswers && (
                    <ImCheckmark className="mt-2 mx-1" id="check" />
                  )}
                </InputGroup>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyTable;
