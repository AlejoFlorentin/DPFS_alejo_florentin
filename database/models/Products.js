module.exports = (sequelize, DataTypes) => {
  const alias = 'Products';

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100), // VARCHAR(100)
    },
    price: {
      type: DataTypes.FLOAT, // O DECIMAL
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products_categories', // nombre exacto de la tabla referenciada
        key: 'id',
      },
    },
    img: {
      type: DataTypes.STRING(100),
    },
    description: {
      type: DataTypes.STRING(400),
    },
  };

  const config = {
    tableName: 'products',
    timestamps: false,
  };

  const Products = sequelize.define(alias, cols, config);
  Products.associate = function (models) {
    //Relación entre las tablas products y products_categories
    Products.belongsTo(models.ProductsCategories, {
      as: 'ProductCategory',
      foreignKey: 'category', // campo de la tabla products que es FK
    });

    Products.belongsToMany(models.Sizes, {
      as: 'sizes',
      through: 'product_sizes',
      foreignKey: 'product',
      otherKey: 'size',
    });

    Products.belongsToMany(models.Orders, {
      as: 'orders',
      through: 'orders_details',
      foreignKey: 'product',
      otherKey: 'orders',
    });
  };
  return Products;
};
