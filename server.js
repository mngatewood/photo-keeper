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

app.post('/api/v1/photos/', (request, response) => {
  const photo = request.body
  const { title, url } = request.body;

  if (title && url) {
    database('photos').insert( photo, 'title' )
      .then(title => response.status(201)
        .json({ result: `${title} added successfully.` }))
      .catch(error => {
          response.status(500).json(error)
      })
  } else {
    return response.status(422).json({ error: 'Must provide photo title and url' });
  }
});

app.delete('/api/v1/photos/:id', (request, response) => {
  const { id } = request.params;

  database('photos').where('id', id ).del()
    .then(result => {
      if (result) {
        return response
          .status(200)
          .json({ result: `Photo ${id} deleted successfully.` })
      } else {
        return response
          .status(404)
          .send({ error: `Photo ${id} not found.` })
      }
    })
    .catch(error => response.status(404).json({ error }));
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} listening on localhost:${app.get('port')}.`); // eslint-disable-line
});

module.exports = { app, database };
