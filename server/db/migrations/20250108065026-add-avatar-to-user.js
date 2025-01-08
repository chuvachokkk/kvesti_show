'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.STRING, // Тип поля
      allowNull: true, // Разрешаем NULL, если аватарка не обязательна
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'avatar');
  },
};
