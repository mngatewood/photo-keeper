const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

app.locals.title = 'Photo Trapper Keeper';

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then((photos) => {
      response.status(200).json(photos)
    })
    .catch((error) => {
      response.status(500).json(error)
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} listening on localhost:${app.get('port')}.`); // eslint-disable-line
});

module.exports = { app, database };
