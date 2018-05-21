const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Routes', () => {

  beforeEach(() => {
    return database.seed.run()
  })

  it('should GET all the photos', (done) => {
    chai.request(app)
      .get('/api/v1/photos')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('title', "Killing Is My Business");
        response.body[0].should.have.property('url', 'https://pbs.twimg.com/media/DaHwViPVQAEzZ6B.jpg');
        done()
      })
  })

  it('should POST a new photo', (done) => {
    chai.request(app)
      .post('/api/v1/photos')
      .send({
        title: 'Risk',
        url: 'http://www.megadeth.com/risk.jpg'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('result', 'Risk added successfully.')
        done()
      })
  })

  it('should throw error if POST does not include title and url', (done) => {
    chai.request(app)
      .post('/api/v1/photos')
      .send({
        title: 'Risk'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.should.be.an('object')
        response.body.should.have.property('error', 'Must provide photo title and url')
        done()
      })
  })

  it('should DELETE an existing photo', (done) => {
    chai.request(app)
      .del('/api/v1/photos/3')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.an('object')
        response.body.should.have.property('result', 'Photo 3 deleted successfully.')
        done()
      })
  })

  it('should return an error if DELETE invalid ID', (done) => {
    chai.request(app)
      .del('/api/v1/photos/10')
      .end((error, response) => {
        response.should.have.status(404)
        response.body.should.have.property('error', 'Photo 10 not found.')
        done()
      })
  })

});

