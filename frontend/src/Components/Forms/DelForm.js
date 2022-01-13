import React, { useEffect, useState } from 'react';
import { Form, Button, Nav, Row, Col, Dropdown, Table } from 'react-bootstrap';
import df from '../../Datafunctions/Datafunctions';
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';
import ModForm from './ModForm';

function DelForm(props) {
  const [activeLang, setActiveLang] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [unUsedLangs, setUnusedLangs] = useState([]);
  const [langTags, setLangTags] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [disableSearch, setDisableSearch] = useState(true);
  const [showMod, setShowMod] = useState(false);
  const [clickedWordId, setClickedWordId] = useState(0);

  console.log('showMod', showMod);

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
    if (event.target.value !== '') {
      setDisableSearch(false);
    }
    if (event.target.value === '') {
      setDisableSearch(true);
    }
  };

  const handleDelete = (lt) => {
    console.log(lt);
    df.deleteById(lt.id).then((res) => handleSearch());
  };

  const handleModOpen = (id) => {
    setClickedWordId(id);
    setShowMod(true);
  };

  return (
    <>
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
            style={{
              maxWidth: '50vw',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>{activeLang}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {langTags.map((lt, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{lt[activeLang]}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      onClick={() => handleModOpen(lt.id)}
                      size="sm"
                      variant="info"
                      id="edit-btn"
                    >
                      <RiEdit2Line />
                    </Button>
                    <Button
                      size="sm"
                      id="del-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you wish to delete the word: ${lt[activeLang]}?`
                          )
                        ) {
                          handleDelete(lt);
                        }
                      }}
                      variant="danger"
                    >
                      <RiDeleteBin2Line />
                    </Button>
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
              <Button
                disabled={disableSearch}
                variant="danger"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
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
      {showMod && (
        <ModForm
          handleClose={props.handleClose}
          showMod={showMod}
          setShowMod={setShowMod}
          wordId={clickedWordId}
        />
      )}
    </>
  );
}

export default DelForm;
