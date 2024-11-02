const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Country = require('./country');

const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'cities',
  timestamps: false,
});


module.exports = City;
