import React, { useState } from 'react';
import DropMenu from '../Components/DropMenu';
import MyTable from '../Components/MyTable';

function Main(props) {
  const [selected, setSelected] = useState(false);
  const [resetTable, setResetTable] = useState(false);

  const setLanguages = (sourceLang, targetLang, tag) => {
    let result = sourceLang + '_' + targetLang;
    console.log(tag);
    console.log(result);
    props.setTag(tag);
    props.setLanguages(result);
  };

  return (
    <div id="main">
      <DropMenu
        selectedLangs={props.selectedLangWords}
        setLanguages={setLanguages}
        setSelected={setSelected}
        setResetTable={setResetTable}
        columns={props.columns}
      />
      <MyTable
        selectedLangWords={props.selectedLangWords}
        langs={props.languages}
        selected={selected}
        resetTable={resetTable}
        setResetTable={setResetTable}
      />
    </div>
  );
}

export default Main;
