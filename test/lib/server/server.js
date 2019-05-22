const chai = require('chai');
const { assert, expect } = chai;
const { Route, APIRoute } = require('../../../lib/routes');
const Server = require('../../../lib/server');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const chaiHttp = require('chai-http');
const should = chai.should();

let userDocId = '1';
let userUsername = 'some_username';
let userDisplayName = 'Some Name';
let artDocId;

mongoose.set('useCreateIndex', true);
require('mongoose-long')(mongoose);

const UserModel = require('../../../lib/db').models.User;

chai.use(chaiHttp);


let server = new Server(3000, '/', path.join(__dirname, '../../../src/routes'));
server.app.use(express.json());

describe('Server tests', () => {

  it ('should connect to database', (done) => {
    mongoose.connect(process.env.MONGODB_SERVER || 'mongodb://localhost/dragondex', { useNewUrlParser: true })
    .then(() => {
      done();
    });
  });

  it('should register routes', () => {
    expect(() => { server.registerRoutes() }).to.not.throw();
  });

  it('should start', (done) => {
    server.listen()
    .then(() => {
      done();
    });
  });

  it('should GET /api/v1/user', (done) => {
    UserModel.findOne({ id: '1' })
    .then((userDoc) => {
      if (userDoc) {
        return userDoc;
      } else {
        return UserModel.create({ id: userDocId, username: userUsername, displayName: userDisplayName });
      }
    })
    .then((userDoc) => {
      chai.request(server.server)
      .get(`/api/v1/user/${userDocId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('username');
        res.body.should.have.property('displayName');
        res.body.should.have.property('posts');
        res.body.posts.should.be.a('array');
        res.body.should.have.property('collectedArt');
        res.body.collectedArt.should.be.a('array');

        assert.equal(res.body.id, userDocId)
        assert.equal(res.body.username, userUsername)
        assert.equal(res.body.displayName, userDisplayName)
        done();
      });
    });
  });

  it('should POST /api/v1/upload/artdetails', (done) => {
    let art = {
      title: "Chai Tests",
      description: "Chai tests are great.",
      postedBy: userDocId
    };

    chai.request(server.server)
    .post('/api/v1/upload/artdetails')
    .send(art)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('postedBy');
      res.body.should.have.property('id');
      res.body.should.have.property('imageUrl');
      res.body.should.have.property('metadata');
      res.body.metadata.should.have.property('title');
      res.body.metadata.should.have.property('description');

      assert.equal(res.body.metadata.title, "Chai Tests")
      assert.equal(res.body.metadata.description, "Chai tests are great.")

      artDocId = res.body.id;

      done();
    });
  });

  it('should GET /api/v1/art', (done) => {
    chai.request(server.server)
    .get(`/api/v1/art/${artDocId}`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('postedBy');
      res.body.postedBy.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('imageUrl');
      res.body.should.have.property('metadata');
      res.body.metadata.should.have.property('title');
      res.body.metadata.should.have.property('description');

      assert.equal(res.body.postedBy.id, userDocId);
      assert.equal(res.body.postedBy.username, userUsername);
      assert.equal(res.body.postedBy.displayName, userDisplayName);

      assert.equal(res.body.metadata.title, "Chai Tests")
      assert.equal(res.body.metadata.description, "Chai tests are great.")

      done();
    });
  });

  it('should POST /api/v1/update/artcollection', (done) => {
    let art = {
      id: artDocId,
      userId: userDocId
    };

    chai.request(server.server)
    .post('/api/v1/update/artcollection')
    .send(art)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('collectedArt');
      res.body.collectedArt.should.be.a('array');
      expect(res.body.collectedArt).to.have.lengthOf(1);
      expect(res.body.collectedArt[0]).to.equal(artDocId);

      done();
    });
  });

  after(() => {
    return new Promise((resolve, reject) => {
      UserModel.deleteMany({ id: userDocId }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  });
});
