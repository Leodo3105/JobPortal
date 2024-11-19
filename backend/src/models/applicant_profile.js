import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';
import District from './district.js';
import City from './city.js';
import Country from './country.js';
import Applicant from './applicant.js';

const ApplicantProfile = sequelize.define('ApplicantProfile', {
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
  fullname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
      isBefore: new Date().toISOString(),
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      is: /^[0-9+\s()-]+$/i,
    },
  },
  cv: {
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
  experience: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  social_media_links: {
    type: DataTypes.JSONB,
    allowNull: true,
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
  tableName: 'applicant_profiles',
  timestamps: false,
});

// User - ApplicantProfile: Một-một
ApplicantProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(ApplicantProfile, { foreignKey: 'user_id', as: 'applicantProfile' });

// ApplicantProfile - Địa chỉ (District, City, Country): Một-nhiều
ApplicantProfile.belongsTo(District, { foreignKey: 'district_id' });
ApplicantProfile.belongsTo(City, { foreignKey: 'city_id' });
ApplicantProfile.belongsTo(Country, { foreignKey: 'country_id' });

ApplicantProfile.hasOne(Applicant, {foreignKey: 'applicant_profile_id', as: 'applicant'});
Applicant.belongsTo(ApplicantProfile, {foreignKey: 'applicant_profile_id', as: 'profile'});

export default ApplicantProfile;
