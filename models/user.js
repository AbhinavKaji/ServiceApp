const sequelize = require("../db/sequelize");
const Sequelize = require("sequelize");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate(async function(user, options) {
    return await bcrypt.hash(user.password, 8).then(function (hashedPw) {
      user.password = hashedPw;
    });
  });
  User.findByCredentials = async (email, password) => {
      const user = await User.findOne({ email })

      if (!user) {
          throw new Error('Unable to login')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
          throw new Error('Unable to login')
      }

      return user
  }
  User.generateAuthToken = async function (user) {
      const token = jwt.sign({ id: user.id.toString(),email: user.email }, 'thisismynewcourse',{
        expiresIn: '1h'
      });
      return token;
  }
  // const user = await User.findByCredentials(req.body.email, req.body.password)
  // User.belongsTo(Role, { as: "role", foreignKey: "roleId" });

  return User;
};