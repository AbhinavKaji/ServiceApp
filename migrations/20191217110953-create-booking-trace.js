'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BookingTraces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      ServiceProviderId: {
        type: Sequelize.INTEGER
      },
      RequestedDate: {
        type: Sequelize.DATE
      },
      RequestAcceptStatus: {
        type: Sequelize.BOOLEAN
      },
      ScheduledDate: {
        type: Sequelize.DATE
      },
      Location:{
        type: Sequelize.STRING
      },
      ServiceCharge:{
        type: Sequelize.INTEGER
      },
      ServiceType:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookingTraces');
  }
};