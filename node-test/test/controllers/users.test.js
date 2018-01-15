import { expect } from 'chai';
import request from 'supertest';
import axios from 'axios';
import app from '../../src/index';
import bookshelf from '../../src/db';
import { access } from 'fs';

/**
 * Tests for '/api/users'
 */
let accessToken;
let userId;
describe('Users Controller Test', () => {
  before(done => {
    bookshelf
      .knex
      .raw('TRUNCATE TABLE users, todo, session CASCADE')
      .then(() => done());
  });

  it('should save the user', done => {
    let registerUser = {
      first_name: 'prajwol',
      last_name: 'prajapati',
      email: 'prajwol@gmail.com',
      password: 'password'
    };

    request(app)
    .post('/api/register')
    .send(registerUser)
    .then((res,err) => {
      // console.log(res,"rerererererererrrerererererererererer");
      // console.log(err, '++++++++++++++++++++++++++++++++++++');
      
      done();
    })
  })

  it('should return token', done => {
    let loginUser = {
      email: 'prajwol@gmail.com',
      password: 'password'
    }
    request(app)
      .post('/api/login')
      .send(loginUser)
      .then((res, err) => {
        let loginInfo = JSON.parse(res.text);
        userId = loginInfo.data.user.id;
        console.log(loginInfo.data.user.id, '------------------------------');
        // console.log(loginInfo.data.user.email, '------------------------------');
        // console.log(loginInfo.data.tokens.accessToken, '-----------------++++++++++-------------');
        // console.log(loginInfo.data.tokens.refreshToken, '-----------------++++++++++-------------');
        expect(res.statusCode).to.be.equal(200);
        accessToken = loginInfo.data.tokens.accessToken;
        expect(loginInfo.data.user.id);
        expect(loginInfo.data.user.email);
        expect(loginInfo.data.tokens.accessToken);
        expect(loginInfo.data.tokens.refreshToken);
        done();
      })
  })

  

  it('should return list of users', done => {
    request(app)
      .get('/api/users')
      .set('Authorization', accessToken)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data).to.have.lengthOf(1);
        // console.log(res);
        done();
      });
  });

  // it('should not create a new user if name is not provided', done => {
  //   let user = {
  //     noname: 'Jane Doe'
  //   };

  //   request(app)
  //     .post('/api/users')
  //     .set('Authorization', accessToken)
  //     .send(user)
  //     .end((err, res) => {
  //       let { code, message, details } = res.body.error;

  //       expect(res.statusCode).to.be.equal(400);
  //       expect(code).to.be.equal(400);
  //       expect(message).to.be.equal('Bad Request');
  //       expect(details).to.be.an('array');
  //       expect(details[0]).to.have.property('message');
  //       expect(details[0]).to.have.property('param', 'name');

  //       done();
  //     });
  // });

  // it('should create a new user with valid data', done => {
  //   let user = {
  //     name: 'Jane Doe'
  //   };

  //   request(app)
  //     .post('/api/users')
  //     .send(user)
  //     .end((err, res) => {
  //       let { data } = res.body;

  //       expect(res.statusCode).to.be.equal(201);
  //       expect(data).to.be.an('object');
  //       expect(data).to.have.property('id');
  //       expect(data).to.have.property('name');
  //       expect(data).to.have.property('createdAt');
  //       expect(data).to.have.property('updatedAt');
  //       expect(data.name).to.be.equal(user.name);

  //       done();
  //     });
  // });

  it('should get information of a user', done => {
    request(app)
      .get('/api/users/'+userId)
      .set('Authorization', accessToken)      
      .end((err, res) => {
        let { data } = res.body;

        expect(res.statusCode).to.be.equal(200);
        console.log(data, '+++++++++++++++++++++++++++++++++++++++++');
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('firstName');
        expect(data).to.have.property('lastName');
        expect(data).to.have.property('password');
        expect(data).to.have.property('email');

        done();
      });
  });

  it('should respond with not found error if random user id is provided', done => {
    request(app)
      .get('/api/users/1991')
      .set('Authorization', accessToken)      
      .end((err, res) => {
        let { code, message } = res.body.error;

        expect(res.statusCode).to.be.equal(404);
        expect(code).to.be.equal(404);
        expect(message).to.be.equal('User not found');

        done();
      });
  });

  it('should update a user if name is provided', done => {
    let user = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      password: 'password'
    };

    request(app)
      .put('/api/users/'+userId)
      .set('Authorization', accessToken)            
      .send(user)
      .end((err, res) => {
        // console.log(res, '111111111111111111111111111111111111111');
        let { data } = res.body;
        console.log(data, '22222222222222222222222222222')
        // expect(res.statusCode).to.be.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('firstName');
        expect(data).to.have.property('lastName');
        expect(data).to.have.property('email');
        // expect(data.name).to.be.equal(user.name);

        done();
      });
  });

  it('should not update a user if wrong attribute is not provided', done => {
    let user = {
      noname: 'John Doe'
    };

    request(app)
      .put('/api/users/' + userId)
      .set('Authorization', accessToken)                  
      .send(user)
      .end((err, res) => {
        let { code, message, details } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'first_name' || 'last_name' || 'email' || 'password');

        done();
      });
  });

  // it('should delete a user if valid id is provided', done => {
  //   request(app)
  //     .delete('/api/users/1')
  //     .end((err, res) => {
  //       expect(res.statusCode).to.be.equal(204);

  //       done();
  //     });
  // });

  // it('should respond with not found error if random user id is provided for deletion', done => {
  //   request(app)
  //     .delete('/api/users/1991')
  //     .end((err, res) => {
  //       let { code, message } = res.body.error;

  //       expect(res.statusCode).to.be.equal(404);
  //       expect(code).to.be.equal(404);
  //       expect(message).to.be.equal('User not found');

  //       done();
  //     });
  // });

  // it('should respond with bad request for empty JSON in request body', done => {
  //   let user = {};

  //   request(app)
  //     .post('/api/users')
  //     .send(user)
  //     .end((err, res) => {
  //       let { code, message } = res.body.error;

  //       expect(res.statusCode).to.be.equal(400);
  //       expect(code).to.be.equal(400);
  //       expect(message).to.be.equal('Empty JSON');

  //       done();
  //     });
  // });
});
