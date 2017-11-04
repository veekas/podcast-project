const Sequelize = require('sequelize');
export const podcastDB = new Sequelize('postgres://localhost:5432/podcast-project', { logging: true });
