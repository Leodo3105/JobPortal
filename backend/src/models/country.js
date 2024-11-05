import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'countries',
  timestamps: false,
});

export default Country;
