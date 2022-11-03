'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Roles',
            [
                {
                    name: 'Reviewer',
                },
                {
                    name: 'Store Owner',
                },
                {
                    name: 'Admin',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {})
    },
}
