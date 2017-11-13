'use strict';

const Sequelize = require('sequelize');
const db = require('../db.js');

const Episode = db.define('episode', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.TEXT
  },
  pubDate: {
    type: Sequelize.TEXT
  },
  guid: {
    type: Sequelize.TEXT
  },
  thumbnail: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  link: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.TEXT
  },
  length: {
    type: Sequelize.INTEGER
  },
  duration: {
    type: Sequelize.INTEGER
  },
});

module.exports = Episode;
