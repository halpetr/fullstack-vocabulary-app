import React, { useEffect, useState } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown, Table } from 'react-bootstrap';
import df from '../../Datafunctions/Datafunctions';

function DelForm(props) {
  const [activeLang, setActiveLang] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [unUsedLangs, setUnusedLangs] = useState([]);
  const [langTags, setLangTags] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  console.log(langTags);

  useEffect(() => {
    setActiveLang('Select language');
  }, []);

  const handleLangSelect = (language) => {
    let ls = props.langs.filter((l) => language !== l);
    if (ls.length !== props.langs.length) {
      setIsLangSelected(true);
    }
    setUnusedLangs(ls);
    setActiveLang(language);
  };

  const handleSearch = () => {
    df.getBySearch(activeLang, activeSearch).then((res) => setLangTags(res));
    setShowTable(true);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setActiveSearch(event.target.value);
  };

  return (
    <Form id="form">
      <Form.Label>
        <h4>Delete by selecting a language and searching for a word:</h4>
      </Form.Label>
      <Dropdown id="dropdown" onClick={() => props.getLanguages()}>
        <Dropdown.Toggle className="mb-2" variant="danger">
          {activeLang}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {!isLangSelected &&
            props.langs.map((index, lang) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleLangSelect(props.langs[lang])}
                >
                  {props.langs[lang]}
                </Dropdown.Item>
              );
            })}
          {isLangSelected &&
            unUsedLangs.map((index, lang) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleLangSelect(unUsedLangs[lang])}
                >
                  {unUsedLangs[lang]}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      {showTable && (
        <Table
          striped
          bordered
          hover
          style={{ maxWidth: '50vw', marginRight: 'auto', marginLeft: 'auto' }}
        >
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>{activeLang}</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {langTags.map((lt, index) => (
              <tr key={index}>
                <td>{lt[activeLang]}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button variant="danger">X</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          value={activeSearch}
          onChange={(e) => handleSearchChange(e)}
          type="text"
          placeholder="search"
        />
      </Form.Group>

      <Row>
        {isLangSelected && (
          <Col>
            <Button variant="danger" onClick={() => handleSearch()}>
              Search
            </Button>
          </Col>
        )}
        {showDelete && (
          <Col>
            <Button variant="danger">Delete</Button>
          </Col>
        )}
      </Row>
      <Row className="mt-2">
        <Col>
          <Button onClick={() => props.handleClose()} variant="primary">
            Go back
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default DelForm;
