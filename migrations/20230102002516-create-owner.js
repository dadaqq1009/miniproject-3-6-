'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Owners', {
      owner_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login_id: {
        type: Sequelize.STRING
      },
      login_pw: {
        type: Sequelize.STRING
      },
      owner_name: {
        type: Sequelize.STRING
      },
      owner_email: {
        type: Sequelize.STRING
      },
      owner_point: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Owners');
  }
};