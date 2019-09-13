'use strict'
module.exports = (sequelize, DataTypes) => {
  const EarningCategory = sequelize.define('EarningCategory', {
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
  EarningCategory.associate = function (models) {
    EarningCategory.belongsTo(models.User, { foreignKey: 'user_id' })
  }
  return EarningCategory
}
