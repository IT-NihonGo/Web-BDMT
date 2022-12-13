'use strict';

const STATUS = require("./../constant/status")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Posts',
      [
          {
              user_id: 1,
              store_id: 1,
              title: 'Bun Dau nha lam',
              content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
              image: 'public/images/avatars/user/default-avatar.png',
              status: STATUS.APPROVED
          },
          {
              user_id: 1,
              store_id: 1,
              title: 'Bun Dau nha lam',
              content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
              image: 'public/images/avatars/user/default-avatar.png',
              status: STATUS.APPROVED
  
          },
          {
              user_id: 1,
              store_id: 1,
              title: 'Bun Dau nha lam',
              content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
              image: 'public/images/avatars/user/default-avatar.png',
              status: STATUS.APPROVED,
          },
          {
            user_id: 1,
            store_id: 1,
            title: 'Bun Dau nha lam',
            content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
            image: 'public/images/avatars/user/default-avatar.png',
              status: STATUS.APPROVED,
        },
        {
            user_id: 1,
            store_id: 1,
            title: 'Bun Dau nha lam',
            content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
            image: 'public/images/avatars/user/default-avatar.png',
            status: STATUS.PENDING,
        },
        {
            user_id: 1,
            store_id: 1,
            title: 'Bun Dau nha lam',
            content: 'Mọi người biết quán bún đậu nào ngon ko, chỉ tui với. Tính bao nhóm IT-Nihongo đi ăn mà không biết quá nào ngon :((',
            image: 'public/images/avatars/user/default-avatar.png',
            status: STATUS.REJECTED,
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
