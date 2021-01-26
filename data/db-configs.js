const configs = require('../knexfile');
const knex = require('knex');

const env = process.env.ENVIRONMENT || 'development';

const db = knex(configs[env]);

module.exports = db;