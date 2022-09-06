require('dotenv').config();

const express = require('express');
const formData = require('express-form-data');
const axios = require('axios');
const fileUpload = require('express-fileupload');
// const os = require('os');

const app = express();

// const options = {
//   uploadDir: os.tmpdir(),
//   autoClean: true,
// };

// app.use(express.urlencoded({ extended: true }));
// // parse data with connect-multiparty.
// app.use(formData.parse(options));
// // delete from the request all empty files (size == 0)
// app.use(formData.format());
// // change the file objects to fs.ReadStream
// app.use(formData.stream());
// // union the body and the files
// app.use(formData.union());

const { PORT } = process.env;
const headers = {
  headers: {
    Authorization: process.env.AUTH,
  },
};

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/productinfo/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/styles/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/styles`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/related/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/related`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/question/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?question_id=${req.params.id}/helpful`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/question/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?question_id=${req.params.id}/reported`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/?answer_id=${req.params.id}/reported`, {}, headers)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/reviews/meta/:id', (req, res) => {
  const { sortTerm } = req.query;
  if (sortTerm) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}&sort=${sortTerm}`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => console.log(err));
  } else {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => console.log(err));
  }
});

app.post('/uploadImage', (req, res) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }
  // const { file } = req.files;
  // if (file) {
  //   app.post('https://api.cloudinary.com/v1_1/deitkdfiq/image/upload', file)
  //     .then((response) => {
  //       console.log('uploadImage response: ', response);
  //     });
  // }
  // console.log('req.files: ', file);
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', {
    sku_id: req.body.sku_id,
    // count: req.body.count,
  }, headers).then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
