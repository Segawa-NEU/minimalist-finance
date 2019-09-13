'use strict'
module.exports = (sequelize, DataTypes) => {
  const Earning = sequelize.define('Earning', {
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
  Earning.associate = function (models) {
    Earning.belongsTo(models.User, { foreignKey: 'user_id' })
    Earning.belongsTo(models.EarningCategory, { foreignKey: 'category_id' })
  }
  return Earning
}
