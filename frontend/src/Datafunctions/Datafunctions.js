import axios from 'axios';

const Datafunctions = {
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

  getByTag: async (tag) => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/tag?tag=${tag}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  deleteById: async (id) => {
    try {
      await axios.delete(`http://localhost:8080/vocabulary/id?id=${id}`);
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

  modifyEntry: async (id, column, value) => {
    try {
      await axios.patch('http://localhost:8080/vocabulary/mod', {
        id: id,
        column: column,
        value: value,
      });
    } catch (error) {
      return console.log(error);
    }
  },
};

export default Datafunctions;
