const photosData = require('../../..//sample-photos');
const { database } = require('../../../server');

const insertPhotos = (knex, photo) => knex('photos').insert({
  title: photo.title,
  url: photo.url
}, 'id');

exports.seed = (knex, Promise) => database.migrate.rollback()
  .then(() => database.migrate.latest())
  .then(() => knex('photos').del())
  .then(() => {
    const photoPromises = [];

    photosData.forEach(photo => {
      photoPromises.push(insertPhotos(knex, photo));
    });

    return Promise.all(photoPromises);
  })
  .catch(error => console.log(`Error seeding photos: ${error}`));
