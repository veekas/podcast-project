const Sequelize = require('sequelize');
const db = require('../db.js');

const Episode = db.define('episode', {
  title: {
    type: Sequelize.STRING
  },
  pubDate: {
    type: Sequelize.STRING
  },
  guid: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  thumbnail: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  link: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  length: {
    type: Sequelize.INTEGER
  },
  duration: {
    type: Sequelize.INTEGER
  },
});

module.exports = Episode;
