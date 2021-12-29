import { useState, useEffect } from 'react';
import Navigation from './Navbar/Navigation';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import NotFound from './Pages/NotFound';
import df from './Datafunctions/Datafunctions';
import AddWords from './Pages/AddWords';

function App() {
  const [vocab, setVocab] = useState([]);
  const [body, setBody] = useState({});

  useEffect(() => {
    df.getVocab()
      .then((res) => setVocab(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="*" exact element={<NotFound />} />
        <Route path="/" exact element={<Main vocab={vocab} />} />
        <Route path="add" exact element={<AddWords />} />
      </Routes>
    </div>
  );
}

export default App;
