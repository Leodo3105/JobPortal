const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const City = require('./city');

const District = sequelize.define('District', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'districts',
  timestamps: false,
});



module.exports = District;
