import React, { useState, useEffect } from 'react';
import DropMenu from '../Components/DropMenu';
import MyTable from '../Components/MyTable';
import df from '../Datafunctions/Datafunctions';

function Main(props) {
  const [selected, setSelected] = useState(false);
  const [resetTable, setResetTable] = useState(false);
  const [tag, setTag] = useState('');
  const [selectedLangWords, setSelectedLangWords] = useState([]);
  const [langs, setLangs] = useState('');

  useEffect(() => {
    if (langs !== '') {
      if (tag !== 'Select topic') {
        df.getByTag(tag).then((res) => setSelectedLangWords(res));
      } else {
        df.getWordsOfSelectedLangs(langs).then((res) =>
          setSelectedLangWords(res)
        );
      }
    }
  }, [langs, tag]);

  const setLanguages = (sourceLang, targetLang, tagg) => {
    let result = sourceLang + '_' + targetLang;
    setTag(tagg);
    setLangs(result);
  };

  return (
    <div id="main">
      <DropMenu
        selectedLangs={selectedLangWords}
        setLanguages={setLanguages}
        setSelected={setSelected}
        setResetTable={setResetTable}
        columns={props.columns}
      />
      <MyTable
        selectedLangWords={selectedLangWords}
        langs={langs}
        selected={selected}
        resetTable={resetTable}
        setResetTable={setResetTable}
      />
    </div>
  );
}

export default Main;
