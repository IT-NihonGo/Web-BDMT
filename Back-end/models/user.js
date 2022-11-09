'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, { foreignKey: 'role_id' })
            User.hasOne(models.UserInfo, { foreignKey: 'user_id' })
            User.hasMany(models.Comment, { foreignKey: 'user_id' })
            User.hasMany(models.Like, { foreignKey: 'user_id' })
            User.hasMany(models.Post, { foreignKey: 'user_id' })
            User.hasMany(models.Rate, { foreignKey: 'user_id' })
            User.hasMany(models.Store, { foreignKey: 'user_id' })
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true,
                },
            },
            password: DataTypes.STRING,
            role_id: DataTypes.TINYINT,
            deletedAt: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'User',
        },
    )
    return User
}