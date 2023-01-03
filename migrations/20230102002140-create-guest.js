'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      login_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      guest_name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(10)
      },
      guest_email: {
        type: Sequelize.STRING
      },
      login_pw: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      guest_point: {
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
    await queryInterface.dropTable('Guests');
  }
};