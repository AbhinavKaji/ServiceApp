'use strict';
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
let sequelize = require('../db/sequelize');
const User = require('../models/user')(sequelize, DataTypes);
const Serviceproviderdetails = require('../models/serviceproviderdetails')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  const ServiceProviderReview = sequelize.define('ServiceProviderReview', {
    ServiceProviderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reviewDate: DataTypes.DATE,
    knowledge: DataTypes.INTEGER,
    skill: DataTypes.INTEGER,
    CustomerSatisfaction: DataTypes.INTEGER,
    AverageReview: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  ServiceProviderReview.associate = function(models) {
    models.belongsTo(User, {
      as: "Users",
      foreignKey: "userId"
    });
    models.belongsTo(Serviceproviderdetails, {
      as: "ServiceProviderDetails",
      foreignKey: "ServiceProviderId"
    });
  };
  return ServiceProviderReview;
};