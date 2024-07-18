// imports important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// imports our database connection from config
const sequelize = require('../config/connection.js');

class Category extends Model {}

// Sets up fields and rules for Category model
Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Exporting Category model
module.exports = Category;
