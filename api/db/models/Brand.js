const db = require('../db');
const { Model, DataTypes } = require('sequelize');
const Vehicle = require('./Vehicle');


class Brand extends Model { }

Brand.init({
    // Model attributes are defined here
    brandName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // model options 
    timestamps: false,
    sequelize: db,  // connection instance
    modelName: 'Brand' // model name
});


Brand.hasMany(Vehicle);
Vehicle.belongsTo(Brand)


module.exports = Brand;