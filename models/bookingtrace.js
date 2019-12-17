'use strict';
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
let sequelize = require('../db/sequelize');
const User = require('../models/user')(sequelize, DataTypes);
const Serviceproviderdetails = require('../models/serviceproviderdetails')(sequelize, DataTypes);
module.exports = (sequelize, DataTypes) => {
  const BookingTrace = sequelize.define('BookingTrace', {
    UserId: DataTypes.INTEGER,
    ServiceProviderId: DataTypes.INTEGER,
    RequestedDate: DataTypes.DATE,
    RequestAcceptStatus: DataTypes.BOOLEAN,
    ScheduledDate: DataTypes.DATE
  }, {});
  BookingTrace.associate = function(models) {
    models.belongsTo(User, {
      as: "Users",
      foreignKey: "UserId"
    });
    models.belongsTo(Serviceproviderdetails, {
      as: "ServiceProviderDetails",
      foreignKey: "ServiceProviderId"
    });
  };
  return BookingTrace;
};