module.exports = (sequelize, DataTypes) => {
  const alias = "UserCategories";
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
    tableName: "user_categories",
    underscored: true,
  };
  const UserCategories = sequelize.define(alias, cols, config);
  return UserCategories;
};
