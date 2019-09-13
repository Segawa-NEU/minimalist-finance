'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Earnings', ['category_id'], {
      type: 'foreign key',
      name: 'FK_Earnings_Earning_Category',
      references: {
        table: 'EarningCategories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Earnings', 'FK_Earnings_Earning_Category')
  }
}
