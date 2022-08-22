const db = require('../db')
const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');


class User extends Model {
    hash(password, salt) {
        return bcrypt.hash(password, salt);
    }
}

User.init({
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: { //required by frontend form
        type: DataTypes.STRING    

    },
    salt: {
        type: DataTypes.STRING

    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false

    },
    lastName: {
        type: DataTypes.STRING
    }

}, {
    // model options 
    sequelize: db, // connection instance
    modelName: 'User' // model name
});

User.beforeCreate((user) => {
    return bcrypt
        .genSalt(16)
        .then((salt) => {
            user.salt = salt;
            return user.hash(user.password, user.salt);
        })
        .then((hash) => {
            user.password = hash;
        });
});

// .hasMany();
// .belongsTo();


module.exports = User