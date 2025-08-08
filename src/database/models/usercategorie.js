'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCategorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'category_id',
        as: 'users',
      });
    }
  }
  UserCategorie.init(
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserCategorie',
      tableName: 'user_categories',
      timestamps: false,
    }
  );
  return UserCategorie;
};
