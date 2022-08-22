const db = require('../db');
const { Model, DataTypes } = require('sequelize');
const { STRING, INTEGER, BOOLEAN } = { ...DataTypes }
const ParseDate = require('../../utils/ParseDate');
const Vehicle = require('./Vehicle');
const User = require('./User');
const Customer = require('./Customer');


class Turn extends Model { }

Turn.init({
    // Model attributes are defined here
    CustomerId: {
        type: INTEGER
    },
    VehicleId: {
        type: INTEGER
    },
    UserId: {//indicates who took the turm
        type: INTEGER
    },
    createdAt: {
        type: STRING,
        defaultValue: ParseDate.getDateTime().date
    },
    creationTime: {
        type: STRING,
        defaultValue: ParseDate.getDateTime().time
    },
    canceledBefore: {
        type: BOOLEAN,
        defaultValue: false
    },
    fromWeb: {
        type: BOOLEAN,
        defaultValue: false
    },
    hour: {
        type: STRING,
    }
}, {
    // model options 
    timestamps: false,
    sequelize: db,  // connection instance
    modelName: 'Turn' // model name
});



//turn to user relationship one to many
Customer.hasMany(Turn)
Turn.belongsTo(Customer);

module.exports = Turn;