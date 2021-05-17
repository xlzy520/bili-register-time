const express = require('express');
const path = require('path');
const app = express();
const shortUrl = require('./api/index')

const allowedOrigins = [
  'http://localhost:63342',
  'https://xlzy520.cn'
];
app.all('*',(req,res,next)=>{
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods','PUT,GET,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers','Content-Type');
  res.header('Access-Control-Allow-Credentials',true);
  next();
})

//
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static());

// Routes
app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/short_url', (req, res) => {
  shortUrl(req, res);
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  res.send({
    id: id,
    title: 'serverless framework',
    link: 'https://serverless.com',
  });
});

app.get('/404', (req, res) => {
  res.status(404).send('Not found');
});

app.get('/500', (req, res) => {
  res.status(500).send('Server Error');
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

// 导出 Express app
module.exports = app;
