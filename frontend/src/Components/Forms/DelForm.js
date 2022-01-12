import React, { useEffect, useState } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown } from 'react-bootstrap';

function DelForm(props) {
  const [activeLang, setActiveLang] = useState('');
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [unUsed, setUnused] = useState([]);

  useEffect(() => {
    setActiveLang('Select language');
  }, []);

  const handleDelLangSelect = (language) => {
    let ls = props.langs.filter((l) => language !== l);
    if (ls.length !== props.langs.length) {
      setIsLangSelected(true);
    }
    setUnused(ls);
    setActiveLang(language);
  };

  return (
    <Form id="form">
      <Form.Label>
        <h4>
          Delete by selecting a language and tag or just search for a word:
        </h4>
      </Form.Label>
      <Dropdown onClick={() => props.getLanguages()}>
        <Dropdown.Toggle className="mb-2" variant="danger">
          {activeLang}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {!isLangSelected &&
            props.langs.map((index, lang) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleDelLangSelect(props.langs[lang])}
                >
                  {props.langs[lang]}
                </Dropdown.Item>
              );
            })}
          {isLangSelected &&
            unUsed.map((index, lang) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleDelLangSelect(unUsed[lang])}
                >
                  {unUsed[lang]}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="intial" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="danger">Search</Button>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="danger">Delete</Button>
    </Form>
  );
}

export default DelForm;
