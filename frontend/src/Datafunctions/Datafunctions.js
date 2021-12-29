import axios from 'axios';

const Datafunctions = {
  getVocab: async () => {
    try {
      let { data } = await axios.get('http://localhost:8080/vocabulary');
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getByLangs: async (langs) => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/langs?langs=${langs}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  postNewWord: async (body) => {
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
  },
};

export default Datafunctions;
