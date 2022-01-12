import React, { useEffect, useState } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown } from 'react-bootstrap';

function DelForm(props) {
  const [activeLang, setActiveLang] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [unUsedLangs, setUnusedLangs] = useState([]);
  const [unUsedTags, setUnusedTags] = useState([]);
  console.log(props.dbTags);

  useEffect(() => {
    setActiveLang('Select language');
    setActiveTag('Select tag');
  }, []);

  const handleLangSelect = (language) => {
    let ls = props.langs.filter((l) => language !== l);
    if (ls.length !== props.langs.length) {
      setIsLangSelected(true);
    }
    setUnusedLangs(ls);
    setActiveLang(language);
  };

  const handleTagSelect = (tag) => {
    let ts = props.langs.filter((t) => tag !== t);
    if (ts.length !== props.langs.length) {
      setIsTagSelected(true);
    }
    setUnusedTags(ts);
    setActiveTag(tag);
  };

  const handleSelections = () => {};

  return (
    <Form id="form">
      <Form.Label>
        <h4>
          Delete by selecting a language and tag or just search for a word:
        </h4>
      </Form.Label>
      <Row id="delRow">
        <Col>
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
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle className="mb-2" variant="danger">
              {activeTag}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {!isTagSelected &&
                props.dbTags.map((tag, index) => {
                  console.log(tag.tags);
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleTagSelect(tag.tags)}
                    >
                      {tag.tags}
                    </Dropdown.Item>
                  );
                })}
              {isTagSelected &&
                unUsedTags.map((tag, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleTagSelect(tag.tags)}
                    >
                      {tag.tags}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Button>Select</Button>
        </Col>
      </Row>
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
      <Row>
        <Col>
          <Button variant="danger">Delete</Button>
        </Col>
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
