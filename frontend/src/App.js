import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

const getVocab = async () => {
  try {
    let { data } = await axios.get('http://localhost:8080/vocabulary');
    return data;
  } catch (error) {
    return console.log(error);
  }
};

const postNewWord = async (body) => {
  try {
    await axios.post('http://localhost:8080/vocabulary', {
      tags: body.tags,
      fi_word: body.fi_word,
      eng_word: body.eng_word,
      sv_word: body.sv_word,
      ru_word: body.ru_word,
    });
  } catch (error) {
    return console.log(error);
  }
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
            <li>
              {voc.fi_word} - {voc.tags}
            </li>
          </ul>
        </Container>
      ))}
      <Button onClick={() => postNewWord()}>ADD</Button>
    </div>
  );
}

export default App;
