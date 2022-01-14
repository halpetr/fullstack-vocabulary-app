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

  getById: async (id) => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/id?id=${id}`
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

  getBySearch: async (lang, srch) => {
    try {
      let search = `${lang}_${srch}`;
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/srch?srch=${search}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getRandomWords: async (lang) => {
    try {
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/randnotag?randnotag=${lang}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getRandomWordsBasedOnTag: async (lang, tag) => {
    try {
      let randwtag = `${lang}_${tag}`;
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/randwtag?randwtag=${randwtag}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getByLangTag: async (lang, tag) => {
    try {
      let langtag = `${lang}_${tag}`;
      console.log(langtag);
      let { data } = await axios.get(
        `http://localhost:8080/vocabulary/langtag?langtag=${langtag}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getAllDifferentTags: async () => {
    try {
      let { data } = await axios.get(`http://localhost:8080/vocabulary/tags`);
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
      return 'success';
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

  modifyOneValue: async (id, column, value) => {
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

  modifyAllValues: async (body) => {
    try {
      let { data } = await axios.patch(
        'http://localhost:8080/vocabulary/modall',
        {
          id: body.id,
          tags: body.tags,
          English: body.English,
          Finnish: body.Finnish,
          Swedish: body.Swedish,
          Russian: body.Russian,
        }
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },
};

export default Datafunctions;
