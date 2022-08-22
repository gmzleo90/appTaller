const db = require('../db');
const { Model, DataTypes } = require('sequelize');
//const Turn = require('./Turn');


const {STRING, INTEGER, BOOLEAN } = {...DataTypes}

class Vehicle extends Model { }

Vehicle.init({
    // Model attributes are defined here
    CustomerId:{
        type: INTEGER
    },

    BrandId: {
        type: INTEGER
    },

    domain: {
        type: STRING,
    },
    model: {
        type: STRING,
        allowNull: false,
    },

}, {
    // model options 
    sequelize: db,  // connection instance
    modelName: 'Vehicle' // model name
});


//turn to vehicle relationshiṕ one to many






module.exports = Vehicle;