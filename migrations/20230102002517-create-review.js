'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      guest_id: {
        allowNull: false,
        references: { model: "Guests", key: "guest_id" },
        type: Sequelize.BIGINT.UNSIGNED,
      },
      owner_id: {
        allowNull: false,
        references: { model: "Owners", key: "owner_id" },
        type: Sequelize.BIGINT.UNSIGNED,
      },
      rate: {
        type: Sequelize.STRING
      },
      comment: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};