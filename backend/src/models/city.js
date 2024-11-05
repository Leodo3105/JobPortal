import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Country from './country.js';

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


export default City;
