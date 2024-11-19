import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Industry = sequelize.define('Industry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'industries',
  timestamps: false,
});

export default Industry;
