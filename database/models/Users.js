module.exports = (sequelize, DataTypes) => {
  const alias = 'Users';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING(50) },
    lastName: { type: DataTypes.STRING(100) },
    telefono: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(100) },
    password: { type: DataTypes.STRING(100) },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user_categories', // nombre exacto de la tabla referenciada
        key: 'id',
      },
      allowNull: false,
    },
    image: { type: DataTypes.STRING(100) },
  };
  const config = {
    tableName: 'users',
    timestamps: false, // si no tienes createdAt/updatedAt
  };
  const Users = sequelize.define(alias, cols, config);

  Users.associate = function (models) {
    Users.belongsTo(models.UserCategories, { as: 'UserCategory', foreignKey: 'category' });
    Users.hasMany(models.Orders, {
      as: 'Orders',
      foreignKey: 'user',
    });
  };

  return Users;
};
