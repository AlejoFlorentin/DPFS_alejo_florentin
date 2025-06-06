module.exports = (sequelize, DataTypes) => {
  const alias = 'Sizes';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING(50),
    },
  };
  const config = {
    tableName: 'sizes',
    timestamps: false, // si no tienes createdAt/updatedAt
  };
  const Sizes = sequelize.define(alias, cols, config);

  Sizes.associate = function (models) {
    //Relación entre las tablas products y products_categories

    Sizes.belongsToMany(models.Products, {
      as: 'products',
      through: 'product_sizes',
      foreignKey: 'size',
      otherKey: 'product',
    });
  };

  return Sizes;
};
