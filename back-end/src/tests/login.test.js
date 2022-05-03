const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../api/app');

const { User } = require('../database/models/');

const { User: userMock } = require('./mock/models');

chai.use(chaiHttp);

const { expect } = chai;

const admin = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--'
};

describe('Rota /login', () => {
  const ENDPOINT = '/login';

  before(() => {
    sinon.stub(User, 'findOne').callsFake(userMock.findOne);
  });

  after(() => {
    User.findOne.restore();
  });

  describe('Verifica se a requisição faz o login do usuário com dados validos.', () => {
    it('A requisição deve retornar código de status 200 e um token de acesso', async () => {
      const response = await chai.request(app).post(ENDPOINT).send(admin);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Verifica se a requisição não faz o login do usuário quando o usuário não é encontrado.', () => {
    it('A requisição deve retornar código de status 400 e um erro', async () => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email: 'xablauadm@deliveryapp.com',
        password: '--adm2@21!!--'
      });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('User does not exist');
    });
  });

  describe('Verifica se a requisição não faz o login do usuário com email invalido.', () => {
    it('Quando o email não é informado.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Email is required');
    });

    it('Quando o email é vazio.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email: '',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('"email" is not allowed to be empty');
    });

    it('Quando o email não é uma string.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email: 2,
        password: 'zx123346'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Email must be a string');
    });
  
    it('Quando o email possui formato invalido.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email: 'xablauson.com',
        password: 'zx123346'
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Invalid email format');
    });
  });

  describe('Verifica se a requisição não faz o login do usuário com senha invalida.', () => {
    it('Quando a senha não é informada.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email:'xablauson@gmail.com',
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password is required');
    });

    it('Quando a senha é vazia.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email:'xablauson@gmail.com',
        password: ''
      });
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('"password" is not allowed to be empty');
    });

    it('Quando a senha não é uma string.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email:'xablauson@gmail.com',
        password: 2
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password must be a string');
    });

    it('Quando o email possui menos de 6 caracteres.',  async() => {
      const response = await chai.request(app).post(ENDPOINT).send({
        email:'xablauson@gmail.com',
        password: 'zx123'
      });
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.eq('Password must be longer than 5 characters');
    });
  });
});