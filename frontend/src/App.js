import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const getVocab = async () => {
  try {
    let { data } = await axios.get('http://localhost:8080/vocabulary');
    return data;
  } catch (error) {
    return console.log(error);
  }
};

const createVocabItemList = (vocabl) => {
  let arr = vocabl.map((v) => v);
  console.log(arr);
  return arr;
};

function App() {
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    getVocab()
      .then((res) => setVocab(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      {vocab.map((voc, index) => (
        <Container key={index}>
          <ul>
            <li>{voc.fi_word}</li>
          </ul>
        </Container>
      ))}
    </div>
  );
}

export default App;
