// const Sequelize = require('sequelize');
// const podcastDB = new Sequelize('postgres://user:pass@example.com:5432/dbname');

import { podcastDB } from './_db.js';

// definitions
const Metadata = podcastDB.define('metadata', {

  entities: {},
  people: {},
  topics: {},
  locations: {}
});

// relationships
  // metadata has one show
  // podcast has

