// imports important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// imports our database connection from config
const sequelize = require('../config/connection');

//Initializes ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Sets up fields and rules for ProductTag model
ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
  
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// Exporting ProductTag model
module.exports = ProductTag;
