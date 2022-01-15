import axios from 'axios';

const Datafunctions = {
  getWordsOfSelectedLangs: async (langs) => {
    try {
      let { data } = await axios.get(`/vocabulary/langs?langs=${langs}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getById: async (id) => {
    try {
      let { data } = await axios.get(`/vocabulary/id?id=${id}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getByTag: async (tag) => {
    try {
      let { data } = await axios.get(`/vocabulary/tag?tag=${tag}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getBySearch: async (lang, srch) => {
    try {
      let search = `${lang}_${srch}`;
      let { data } = await axios.get(`/vocabulary/srch?srch=${search}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getRandomWords: async (lang) => {
    try {
      let { data } = await axios.get(`/vocabulary/randnotag?randnotag=${lang}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getRandomWordsBasedOnTag: async (lang, tag) => {
    try {
      let randwtag = `${lang}_${tag}`;
      let { data } = await axios.get(
        `/vocabulary/randwtag?randwtag=${randwtag}`
      );
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getByLangTag: async (lang1, lang2, tag) => {
    try {
      let langtag = `${lang1}_${lang2}_${tag}`;
      console.log(langtag);
      let { data } = await axios.get(`/vocabulary/langtag?langtag=${langtag}`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getAllDifferentTags: async () => {
    try {
      let { data } = await axios.get(`/vocabulary/tags`);
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  deleteById: async (id) => {
    try {
      await axios.delete(`/vocabulary/id?id=${id}`);
    } catch (error) {
      return console.log(error);
    }
  },

  postNewWord: async (body) => {
    try {
      await axios.post('/vocabulary', {
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
      return await axios.get('/vocabulary/cols');
    } catch (error) {
      return console.log(error);
    }
  },

  modifyOneValue: async (id, column, value) => {
    try {
      let { data } = await axios.patch('/vocabulary/mod', {
        id: id,
        column: column,
        value: value,
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  modifyAllValues: async (body) => {
    try {
      let { data } = await axios.patch('/vocabulary/modall', {
        id: body.id,
        tags: body.tags,
        English: body.English,
        Finnish: body.Finnish,
        Swedish: body.Swedish,
        Russian: body.Russian,
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  },

  getUser: async (body) => {
    let userpw = `${body.user}_${body.pw}`;
    try {
      return await axios.get(`/users/login?login=${userpw}`);
    } catch (error) {
      return console.log(error);
    }
  },
};

export default Datafunctions;
