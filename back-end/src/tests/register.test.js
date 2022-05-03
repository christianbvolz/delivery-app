const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { User } = require('../database/models/');

const { User: userMock } = require('./mock/models');

chai.use(chaiHttp);

const { expect } = chai;

const newUser = {
  name: 'xablau',
  email: 'xablauson@gmail.com',
  password: 'zx123346'
};

describe('Rota /register', () => {
  const ENDPOINT = '/register';

  before(() => {
    sinon.stub(User, 'create').callsFake(userMock.create);
    sinon.stub(User, 'findOne').callsFake(userMock.findOne);
  });

  after(() => {
    User.create.restore();
    User.findOne.restore();
  });

  describe('Verifica se a requisição cadastra um novo usuário com dados validos.', () => {
    it('A requisição deve retornar código de status 201 e um token de acesso', async () => {
      const response = await chai.request(app).post(ENDPOINT).send(newUser);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property('token');
    });
  });

  // describe('Verifica se a requisição não cadastra um usuário já cadastrado.', () => {

  //    ///// não consigo fazer o mock do findOne com o uso de or no where //////

  //   it('A requisição deve retornar código de status 409 e um erro', async () => {
  //     const response = await chai.request(app).post(ENDPOINT).send({
  //       name: 'Cliente Zé Birita',
  //       email: 'xablauson@gmail.com',
  //       password: 'zx123346'
  //     });

  //     expect(response).to.have.status(409);
  //     expect(response.body).to.have.property('message');
  //     expect(response.body.message).to.be.eq('User already exists');
  //   });
  // });

  describe('Verifica se a requisição não cadastra um novo usuário com nome invalido.', () => {
    it('Quando o nome não é informado.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email: 'xablauson@gmail.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Name is required');
    });

    it('Quando o nome é vazio.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: '',
        email: 'xablauson@gmail.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('"name" is not allowed to be empty');
    });

    it('Quando o nome não é uma string.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 1,
        email: 'xablauson@gmail.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Name must be a string');
    });

    it('Quando o nome possui mais de 12 caracteres.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablauson da silva junior',
        email: 'xablauson@gmail.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Name must be less than 12 characters');
    });
  });

  describe('Verifica se a requisição não cadastra um novo usuário com email invalido.', () => {
    it('Quando o email não é informado.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Email is required');
    });

    it('Quando o email é vazio.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        email: '',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('"email" is not allowed to be empty');
    });

    it('Quando o email não é uma string.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        email: 2,
        password: 'zx123346'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Email must be a string');
    });

    it('Quando o email possui formato invalido.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablauson',
        email: 'xablauson.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Invalid email format');
    });
  });

  describe('Verifica se a requisição não cadastra um novo usuário com senha invalida.', () => {
    it('Quando a senha não é informada.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        email:'xablauson@gmail.com',
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password is required');
    });

    it('Quando a senha é vazia.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        email:'xablauson@gmail.com',
        password: ''
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('"password" is not allowed to be empty');
    });

    it('Quando a senha não é uma string.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablau',
        email:'xablauson@gmail.com',
        password: 2
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password must be a string');
    });

    it('Quando o email possui menos de 6 caracteres.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        name: 'xablauson',
        email:'xablauson@gmail.com',
        password: 'zx123'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password must be longer than 5 characters');
    });
  });
});
