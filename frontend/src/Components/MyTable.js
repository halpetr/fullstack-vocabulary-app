import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup, Table } from 'react-bootstrap';
import { ImCross, ImCheckmark } from 'react-icons/im';

function MyTable(props) {
  const [language1, setLanguage1] = useState([]);
  const [language2, setLanguage2] = useState([]);
  const [renderLangs, setRenderLangs] = useState([]);

  useEffect(() => {
    let la = props.langs.split('_');
    switch (la[0]) {
      case 'eng':
        setLanguage1('English');
        break;
      case 'fi':
        setLanguage1('Finnish');
        break;
      case 'sv':
        setLanguage1('Swedish');
        break;
      case 'ru':
        setLanguage1('Russian');
        break;
      default:
        setLanguage1('Source Language');
        break;
    }
    switch (la[1]) {
      case 'eng':
        setLanguage2('English');
        break;
      case 'fi':
        setLanguage2('Finnish');
        break;
      case 'sv':
        setLanguage2('Swedish');
        break;
      case 'ru':
        setLanguage2('Russian');
        break;
      default:
        setLanguage2('Target Language');
        break;
    }
    setRenderLangs(la);
  }, [props.langs]);

  const handleChange = (e, lang) => {
    e.preventDefault();
    console.log(e.target.value);
    if (
      lang[renderLangs[1] + '_word'].toLowerCase() ===
      e.target.value.toLowerCase()
    ) {
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
          {props.selectedLangWords.map((lang, index) => (
            <tr key={index}>
              <td>{lang[renderLangs[0] + '_word']}</td>
              <td>
                {' '}
                <InputGroup>
                  <FormControl
                    type="text"
                    onChange={(e) => handleChange(e, lang)}
                  />
                  <ImCross className="mt-2 mx-1" id="cross" />
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
