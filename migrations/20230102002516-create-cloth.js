'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cloths', {
      cloth_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      guest_id: {
        allowNull: false,
        references: { model: "Guests", key: "guest_id" },
        type: Sequelize.BIGINT.UNSIGNED
      },
      tel: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      ask: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      img: {
        type: Sequelize.STRING(500)
      },
      status: {
        type: Sequelize.ENUM("waiting", "active", "finished"),
        defaultValue: "waiting"
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
    await queryInterface.dropTable('Cloths');
  }
};