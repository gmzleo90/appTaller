const Sequelize = require('sequelize');
// const Brand = require('./models/Brand');
// const Vehicle = require('./models/Vehicle');

const db = new Sequelize('app_taller', null, null, {
  host: 'postgres://gmzleo90:tvIlMIp0o1QPepHFr6FqK7Z3hyhVTVuA@dpg-chbds93hp8u01612t510-a/app_taller',
  dialect: 'postgres',
  logging: false
});


 

module.exports = db