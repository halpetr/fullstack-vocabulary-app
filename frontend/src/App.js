import { useState, useEffect } from 'react';
import Navigation from './Navbar/Navigation';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import NotFound from './Pages/NotFound';
import Admin from './Pages/Admin';
import df from './Datafunctions/Datafunctions';
import Select from './Pages/Select';

function App() {
  const [selectedLangWords, setSelectedLangWords] = useState([]);
  const [languages, setLanguages] = useState('');
  const [databaseCols, setDatabaseCols] = useState([]);
  const [tag, setTag] = useState('');
  console.log('LANGS', languages);
  console.log('WORDS', selectedLangWords);

  useEffect(() => {
    if (languages !== '') {
      df.getSelectedLanguages(languages).then((res) =>
        setSelectedLangWords(res)
      );
      if (tag !== 'Select topic') {
        df.getByTag(tag).then((res) => setSelectedLangWords(res));
      }
      console.log('wbt', tag);
    }
  }, [languages, tag]);

  useEffect(() => {
    df.getDatabaseColumns().then((res) => setDatabaseCols(res.data));
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="*" exact element={<NotFound />} />
        <Route
          path="/"
          exact
          element={
            <Main
              selectedLangWords={selectedLangWords}
              setLanguages={setLanguages}
              languages={languages}
              columns={databaseCols}
              setTag={setTag}
            />
          }
        />
        <Route path="/select" exact element={<Select />} />
        <Route path="/admin" exact element={<Admin columns={databaseCols} />} />
      </Routes>
    </div>
  );
}

export default App;
