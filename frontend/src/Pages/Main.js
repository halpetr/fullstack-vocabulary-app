import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DropMenu from '../Components/DropMenu';

import MyTable from '../Components/MyTable';
import df from '../Datafunctions/Datafunctions';

function Main(props) {
  const [selectedLangWords, setSelectedLangs] = useState([]);
  const [languages, setLanguages] = useState('');
  const [selected, setSelected] = useState(false);
  const [resetTable, setResetTable] = useState(false);

  useEffect(() => {
    if (languages !== '') {
      df.getSelectedLanguages(languages).then((res) => setSelectedLangs(res));
    }
  }, [languages]);

  const selectLanguages = (sourceLang, targetLang) => {
    let result = sourceLang + '_' + targetLang;
    console.log(result);
    setLanguages(result);
  };

  return (
    <div id="main">
      <DropMenu
        selectedLangs={selectedLangWords}
        selectLanguages={selectLanguages}
        setSelected={setSelected}
        setResetTable={setResetTable}
      />
      <MyTable
        selectedLangWords={selectedLangWords}
        langs={languages}
        selected={selected}
        resetTable={resetTable}
        setResetTable={setResetTable}
      />
    </div>
  );
}

export default Main;
