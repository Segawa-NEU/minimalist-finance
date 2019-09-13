'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    identity: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Composite_Unique_User_Identity_Provider'
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'Composite_Unique_User_Identity_Provider'
    }
  }, {})
  User.associate = function (models) {
    User.hasMany(models.ExpenseCategory, { foreignKey: 'user_id' })
    User.hasMany(models.Expense, { foreignKey: 'user_id' })
    User.hasMany(models.EarningCategory, { foreignKey: 'user_id' })
    User.hasMany(models.Earning, { foreignKey: 'user_id' })
  }
  return User
}
