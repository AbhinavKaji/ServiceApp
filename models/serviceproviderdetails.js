'use strict';
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
let sequelize = require('../db/sequelize');
const User = require('../models/user')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  const ServiceProviderDetails = sequelize.define('ServiceProviderDetails', {
    UserId: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    Charges: DataTypes.STRING,
    AllocatedRegion: DataTypes.STRING,
    Description: DataTypes.TEXT
  }, {});
  ServiceProviderDetails.associate = function(models) {
    models.belongsTo(User, {
      as: "Users",
      foreignKey: "UserId"
    });
  };
  return ServiceProviderDetails;
};