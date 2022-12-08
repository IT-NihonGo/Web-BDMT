'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Rates',
      [
          {
              amount: 1,
              user_id: 1,
              store_id: 1,
          },
          {
              amount: 3,
              user_id: 3,
              store_id: 1,
          },
          {
              amount: 4,
              user_id: 1,
              store_id: 4,
          },
          {
              amount: 5,
              user_id: 2,
              store_id: 4,
          },
          {
            amount: 1,
            user_id: 1,
            store_id: 1,
          },
          {
              amount: 3,
              user_id: 3,
              store_id: 1,
          },
          {
              amount: 4,
              user_id: 1,
              store_id: 4,
          },
          {
              amount: 5,
              user_id: 2,
              store_id: 4,
          },
      ],
      {},
  )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {
      [Op.or]: [{ role: 1 }, { role: 2 }],
  })
  }
};
