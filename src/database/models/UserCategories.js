module.exports = (sequelize, DataTypes) => {
  const alias = 'UserCategories';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  };
  const config = {
    tableName: 'user_categories',
    timestamps: false,
  };
  const UserCategories = sequelize.define(alias, cols, config);

  UserCategories.associate = function (models) {
    UserCategories.hasMany(models.Users, { as: 'users', foreignKey: 'category' });
  };

  return UserCategories;
};
