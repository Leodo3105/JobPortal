const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Industry = sequelize.define('Industry', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'industries',
  timestamps: false,
});

module.exports = Industry;
