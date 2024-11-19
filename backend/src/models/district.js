import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import City from './city.js';

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

District.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(District, { foreignKey: 'city_id' });

export default District;
