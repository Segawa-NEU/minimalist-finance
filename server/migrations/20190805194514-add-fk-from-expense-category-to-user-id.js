'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ExpenseCategories', ['user_id'], {
      type: 'foreign key',
      name: 'FK_ExpenseCategories_User',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ExpenseCategories', 'FK_ExpenseCategories_User')
  }
}
