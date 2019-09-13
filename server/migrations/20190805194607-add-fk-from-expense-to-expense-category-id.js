'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Expenses', ['category_id'], {
      type: 'foreign key',
      name: 'FK_Expenses_Expense_Category',
      references: {
        table: 'ExpenseCategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Expenses', 'FK_Expenses_Expense_Category')
  }
}
