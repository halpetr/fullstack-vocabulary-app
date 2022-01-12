import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

function DropMenu(props) {
  const [activeLang1, setActiveLang1] = useState('');
  const [activeLang2, setActiveLang2] = useState('');
  const [langs, setLangs] = useState([]);
  const [unUsed, setUnused] = useState([]);
  const [isLangSelected, setIsLangSelected] = useState(false);

  useEffect(() => {
    setActiveLang1('Select language');
    setActiveLang2('Select language');
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

  const handleClickLeft = (language) => {
    let ls = langs.filter((l) => language !== l);
    console.log(ls);
    if (ls.length !== langs.length) {
      setIsLangSelected(true);
    }
    setUnused(ls);
    setActiveLang1(language);
  };

  const handleClickRight = (language) => {
    let ls = unUsed.filter((l) => language !== l);
    console.log(ls);
    if (ls.length !== langs.length) {
      setIsLangSelected(true);
      props.selectLanguages(activeLang1, language);
    }
    setUnused(ls);
    setIsLangSelected(false);
    props.setSelected(true);
    props.setResetTable(true);
    setActiveLang2(language);
  };

  return (
    <Row id="dropmenu">
      <Col>
        <h6>Select a language you know:</h6>
        <Dropdown onClick={() => getLanguages()}>
          <Dropdown.Toggle id="toggle" variant="info">
            {activeLang1}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {!isLangSelected &&
              langs.map((index, lang) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleClickLeft(langs[lang])}
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
                    onClick={() => handleClickLeft(unUsed[lang])}
                  >
                    {unUsed[lang]}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <h6>Select language you want to learn:</h6>
        <Dropdown onClick={() => getLanguages()}>
          <Dropdown.Toggle
            id="toggle"
            disabled={!isLangSelected}
            variant="info"
          >
            {activeLang2}
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {!isLangSelected &&
              langs.map((index, lang) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleClickRight(langs[lang])}
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
                    onClick={() => handleClickRight(unUsed[lang])}
                  >
                    {unUsed[lang]}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default DropMenu;
