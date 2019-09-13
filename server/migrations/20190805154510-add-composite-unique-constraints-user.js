'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['identity', 'provider'], {
      type: 'unique',
      name: 'Composite_Unique_User_Identity_Provider'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'Composite_Unique_User_Identity_Provider')
  }
}
