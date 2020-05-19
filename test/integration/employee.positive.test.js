const request = require('supertest');

const app = require('../../app');
const mongodb = require('../../mongodb/mongodb.utils');

const contactsURL = '/api/contacts';

describe('Positive Scenarios - Integration Tests', () => {
  beforeAll(async () => {
    await mongodb.connect();
  });
});
