'use strict'
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.REAL,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {})
  Expense.associate = function (models) {
    Expense.belongsTo(models.User, { foreignKey: 'user_id' })
    Expense.belongsTo(models.ExpenseCategory, { foreignKey: 'category_id' })
  }
  return Expense
}
