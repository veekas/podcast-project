const Sequelize = require('sequelize');
import db from '../db.js';

// note: the seed files are nested; make sure to seed correctly based on that
// also: how to send "items" array to episodes model? not sure

const Podcast = db.define('podcast', {
  url: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING
  }
});

module.exports = Podcast
