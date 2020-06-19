const axios = require('axios');

const delDocument = async (url, payload) => {
  await axios
    .delete(url, { data: payload })
    .then
    // Do something here
    ();
};

export default delDocument;
