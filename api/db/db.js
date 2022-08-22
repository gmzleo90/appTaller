const Sequelize = require('sequelize');
// const Brand = require('./models/Brand');
// const Vehicle = require('./models/Vehicle');

const db = new Sequelize('appTaller', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});


 

module.exports = db