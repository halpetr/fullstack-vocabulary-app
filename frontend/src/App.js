import { useState, useEffect } from 'react';
import Navigation from './Navbar/Navigation';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import NotFound from './Pages/NotFound';
import AddWords from './Pages/AddWords';
import df from './Datafunctions/Datafunctions';

function App() {
  const [selectedLangWords, setSelectedLangWords] = useState([]);
  const [languages, setLanguages] = useState('');
  const [test, setTest] = useState([]);
  const [databaseCols, setDatabaseCols] = useState([]);
  console.log('LANGS', languages);

  useEffect(() => {
    if (languages !== '') {
      df.getSelectedLanguages(languages).then((res) =>
        setSelectedLangWords(res)
      );
    }
    df.getByTag('animal').then((res) => setTest(res));
  }, [languages]);

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
            />
          }
        />
        <Route path="/select" exact element={<Main />} />
        <Route path="add" exact element={<AddWords columns={databaseCols} />} />
      </Routes>
    </div>
  );
}

export default App;
