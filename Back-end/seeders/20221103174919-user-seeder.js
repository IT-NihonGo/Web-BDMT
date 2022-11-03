'use strict'

const hash_helper = require('../helpers/password-encrypter/hash_helper')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Revirewer 1',
                    email: 'revirewer1@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 1,
                },
                {
                    name: 'Revirewer 2',
                    email: 'revirewer2@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 1,
                },
                {
                    name: 'Store Owner 1',
                    email: 'storeowner1@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 2,
                },
                {
                    name: 'revirewer2',
                    email: 'storeowner2@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 2,
                },
                {
                    name: 'Admin 1',
                    email: 'admin1@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 3,
                },
                {
                    name: 'Admin 2',
                    email: 'admin2@gmail.com',
                    password: hash_helper.hash('123456'),
                    role_id: 3,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {})
    },
}
