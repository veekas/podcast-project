const Sequelize = require('sequelize');
const db = require('../db.js');

// note: the seed files are nested; make sure to seed correctly based on that
// also: how to send "items" array to episodes model? not sure

const Podcast = db.define('podcast', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.TEXT
  },
  title: {
    type: Sequelize.TEXT
  },
  link: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.TEXT
  }
});

module.exports = Podcast
