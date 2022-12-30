const db = require('../db');
const { Model, DataTypes } = require('sequelize');
const { DATE } = require('sequelize');
const ParseDate = require('../../utils/ParseDate');
//const Turn = require('./Turn');


const {STRING, INTEGER, BOOLEAN } = {...DataTypes}

class Vehicle extends Model { }

Vehicle.init({
    // Model attributes are defined here
    // customerId:{
    //     type: INTEGER,
    //     allowNull: false,
    // },

    // brandId: {
    //     type: INTEGER,
    //     allowNull: false,
    // },

    domain: {
        type: STRING,
    },
    model: {
        type: STRING,
        allowNull: false,
    },

    year: {
        type: STRING,
        allowNull: false,
    },
    createdAt: {
        type: STRING,
        defaultValue: ParseDate.getDateTime().date
    },

}, {
    // model options 
    timestamps: false,
    sequelize: db,  // connection instance
    modelName: 'Vehicle' // model name
});


//turn to vehicle relationshiṕ one to many






module.exports = Vehicle;