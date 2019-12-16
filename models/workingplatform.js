'use strict';
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
let sequelize = require('../db/sequelize');
const Serviceproviderdetails = require('../models/serviceproviderdetails')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  const WorkingPlatform = sequelize.define('WorkingPlatform', {
    ServiceProviderId: DataTypes.INTEGER,
    platform: DataTypes.STRING
  }, {});
  WorkingPlatform.associate = function(models) {
    models.belongsTo(Serviceproviderdetails, {
      as: "ServiceProviderDetails",
      foreignKey: "ServiceProviderId"
    });
  };
  return WorkingPlatform;
};