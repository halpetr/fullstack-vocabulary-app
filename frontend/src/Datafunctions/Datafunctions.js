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

  getSelectedLanguages: async (langs) => {
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
        English: body.English,
        Finnish: body.Finnish,
        Swedish: body.Swedish,
        Russian: body.Russian,
      });
    } catch (error) {
      return console.log(error);
    }
  },

  getDatabaseColumns: async () => {
    try {
      return await axios.get('http://localhost:8080/vocabulary/cols');
    } catch (error) {
      return console.log(error);
    }
  },
};

export default Datafunctions;
