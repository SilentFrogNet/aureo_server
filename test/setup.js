import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as faker from 'faker';
import app from '../src/app';

chai.use(sinonChai);

export const { expect } = chai;
export const server = supertest.agent(app);
export const BASE_URL = '/api/v1';
export const { fake } = faker;
