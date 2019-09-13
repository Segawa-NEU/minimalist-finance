'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('EarningCategories', ['user_id'], {
      type: 'foreign key',
      name: 'FK_EarningCategories_User',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('EarningCategories', 'FK_EarningCategories_User')
  }
}
