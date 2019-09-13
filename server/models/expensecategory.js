'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExpenseCategory = sequelize.define('ExpenseCategory', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
      },
      allowNull: false
    }
  }, {})
  ExpenseCategory.associate = function (models) {
    ExpenseCategory.belongsTo(models.User, { foreignKey: 'user_id' })
  }
  return ExpenseCategory
}
