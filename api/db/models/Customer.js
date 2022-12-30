const db = require('../db');
const { Model, DataTypes } = require('sequelize');
const ParseDate = require('../../utils/ParseDate');
const Vehicle = require('./Vehicle');





class Customer extends Model { }

Customer.init({
    //     // Model attributes are defined here

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING
    },
    cuit: {
        type: DataTypes.STRING
    },

    customerType: {
        type: DataTypes.BOOLEAN,
        defaultValue: false//false is normal client, true anables vip aacount
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING
    },

    ownerId: {
        type: DataTypes.INTEGER
    },

    lastUpdate: {
        type: DataTypes.STRING,
        defaultValue: ParseDate.getDateTime().date
    }

}, {
    // model options
    timestamps: false,
    sequelize: db,  // connection instance
    modelName: 'Customer' // model name
});

Customer.hasMany(Vehicle);
Vehicle.belongsTo(Customer);




module.exports = Customer;