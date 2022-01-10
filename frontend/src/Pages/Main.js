import React, { useState, useEffect } from 'react';
import DropMenu from '../Components/DropMenu';

import MyTable from '../Components/MyTable';
import df from '../Datafunctions/Datafunctions';

function Main(props) {
  const [selectedLangWords, setSelectedLangs] = useState([]);
  const [languages, setLanguages] = useState('');

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
      />
      <MyTable selectedLangWords={selectedLangWords} langs={languages} />
    </div>
  );
}

export default Main;
