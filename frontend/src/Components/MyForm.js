import React, { useState, useEffect } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown } from 'react-bootstrap';
import df from '../Datafunctions/Datafunctions';
import Add from './Forms/AddForm';

function MyForm(props) {
  const [langs, setLangs] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [activeLang, setActiveLang] = useState('');
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [unUsed, setUnused] = useState([]);
  console.log(props.columns);
  console.log(dbTags);

  useEffect(() => {
    setActiveLang('Select language');
    df.getAllDifferentTags().then((res) => setDbTags(res));
  }, []);

  const getLanguages = () => {
    let n = [];
    props.columns.forEach((col) => {
      if (
        col['column_name'].includes('ish') ||
        col['column_name'].includes('ian')
      ) {
        let m = col['column_name'].split('_');
        n.push(m[0]);
      }
    });
    setLangs(n);
  };

  const handleClose = () => {
    props.setOptionSelected(false);
    props.setIsAdd(false);
    props.setIsDel(false);
    props.setIsMod(false);
  };

  // If props.isAdd is true, then return this form and on
  // Add button click post the data to database.
  if (props.isAdd) {
    return <Add handleClose={handleClose} />;
  }

  const handleDelLangSelect = (language) => {
    let ls = langs.filter((l) => language !== l);
    if (ls.length !== langs.length) {
      setIsLangSelected(true);
    }
    setUnused(ls);
    setActiveLang(language);
  };

  // If props.isDel is true, then return this form
  if (props.isDel) {
    return (
      <Form id="form">
        <Form.Label>
          <h4>
            Delete by selecting a language and tag or just search for a word:
          </h4>
        </Form.Label>
        <Dropdown onClick={() => getLanguages()}>
          <Dropdown.Toggle className="mb-2" variant="danger">
            {activeLang}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {!isLangSelected &&
              langs.map((index, lang) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleDelLangSelect(langs[lang])}
                  >
                    {langs[lang]}
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

  // If props.isDel is true, then return this form
  if (props.isMod) {
    return (
      <Form id="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Modify</Form.Label>
          <Form.Control type="text" placeholder="intial" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default MyForm;
