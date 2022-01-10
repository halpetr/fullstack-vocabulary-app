import { useState, useEffect } from 'react';
import Navigation from './Navbar/Navigation';
import { Route, Routes } from 'react-router-dom';
import Main from './Pages/Main';
import NotFound from './Pages/NotFound';
import AddWords from './Pages/AddWords';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="*" exact element={<NotFound />} />
        <Route path="/" exact element={<Main />} />
        <Route path="/select" exact element={<Main />} />
        <Route path="add" exact element={<AddWords />} />
      </Routes>
    </div>
  );
}

export default App;
