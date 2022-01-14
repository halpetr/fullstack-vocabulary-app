import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import df from '../Datafunctions/Datafunctions';

function DropMenu(props) {
  const [activeLang1, setActiveLang1] = useState('');
  const [activeLang2, setActiveLang2] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [langs, setLangs] = useState([]);
  const [unUsed, setUnused] = useState([]);
  const [isLangSelected, setIsLangSelected] = useState(false);
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [tags, setTags] = useState([]);
  const [unUsedTags, setUnUsedTags] = useState([]);

  useEffect(() => {
    setActiveLang1('Select language');
    setActiveLang2('Select language');
    setActiveTag('Select topic');
    df.getAllDifferentTags().then((res) => setTags(res));
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
    if (ls.length !== langs.length) {
      setIsLangSelected(true);
    }
    setUnused(ls);
    setActiveLang1(language);
  };

  const handleClickRight = (language) => {
    let ls = unUsed.filter((l) => language !== l);
    setUnused(ls);
    setActiveLang2(language);
  };

  const handleClickTag = (tag) => {
    let ft = tags.filter((t) => t['tags'] !== tag);
    setUnUsedTags(ft);
    setIsTagSelected(true);
    setActiveTag(tag);
  };

  const handlePlayClick = () => {
    setIsLangSelected(true);
    props.setLanguages(activeLang1, activeLang2, activeTag);
    setIsLangSelected(false);
    props.setSelected(true);
    props.setResetTable(true);
    setIsTagSelected(false);
  };

  return (
    <Container id="dropmenu">
      <Row id="droprow">
        <Col>
          <h6>Select a language you know:</h6>
          <Dropdown onClick={() => getLanguages()}>
            <Dropdown.Toggle id="toggle" variant="info">
              {activeLang1}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="info">
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
            <Dropdown.Toggle id="toggle" variant="info">
              {activeLang2}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="info">
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
      <Row id="droprow">
        <Col>
          <h6>Select a topic (optional):</h6>
          <Dropdown>
            <Dropdown.Toggle id="toggle" variant="info">
              {activeTag}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="info">
              {!isTagSelected &&
                tags.map((tag, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleClickTag(tag['tags'])}
                    >
                      {tag['tags']}
                    </Dropdown.Item>
                  );
                })}
              {isTagSelected &&
                unUsedTags.map((tag, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleClickTag(tag['tags'])}
                    >
                      {tag['tags']}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col id="drop-btn-col">
          <Button onClick={() => handlePlayClick()} variant="success">
            Play!
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DropMenu;
