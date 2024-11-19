import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';
import District from './district.js';
import City from './city.js';
import Country from './country.js';

const EmployerProfile = sequelize.define('EmployerProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'districts',
      key: 'id',
    },
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'cities',
      key: 'id',
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'countries',
      key: 'id',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  social_media_links: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Logo must be a valid URL',
      },
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'employer_profiles',
  timestamps: false,
});

// User - EmployerProfile: Một-một
EmployerProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(EmployerProfile, { foreignKey: 'user_id' });

// EmployerProfile - Địa chỉ (District, City, Country): Một-nhiều
EmployerProfile.belongsTo(District, { foreignKey: 'district_id' });
EmployerProfile.belongsTo(City, { foreignKey: 'city_id' });
EmployerProfile.belongsTo(Country, { foreignKey: 'country_id' });

export default EmployerProfile;
