import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import df from '../Datafunctions/Datafunctions';

function DropMenu(props) {
  const [activeLang1, setActiveLang1] = useState('');
  const [activeLang2, setActiveLang2] = useState('');
  const [langs, setLangs] = useState([]);
  const [databaseCols, setDatabaseCols] = useState([]);
  const [unUsed, setUnused] = useState([]);
  const [isLangSelected, setIsLangSelected] = useState(false);

  const getLanguages = () => {
    let n = [];
    databaseCols.forEach((col) => {
      if (
        col['column_name'].includes('ish') ||
        col['column_name'].includes('ian')
      ) {
        let m = col['column_name'].split('_');
        n.push(m[0]);
        setLangs(n);
      }
    });
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
    setActiveLang2(language);
  };

  useEffect(() => {
    setActiveLang1('Select language');
    setActiveLang2('Select language');
  }, []);

  useEffect(() => {
    df.getDatabaseColumns().then((res) => setDatabaseCols(res.data));
  }, [databaseCols]);

  return (
    <Row id="dropmenu">
      <Col>
        <h6>Select a language you know:</h6>
        <Dropdown onClick={() => getLanguages()}>
          <Dropdown.Toggle variant="dark">{activeLang1}</Dropdown.Toggle>
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
          <Dropdown.Toggle disabled={!isLangSelected} variant="dark">
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
