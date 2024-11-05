import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
      model: 'users', // Tên bảng tham chiếu
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'districts',
      key: 'id',
    },
    allowNull: true,
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cities',
      key: 'id',
    },
    allowNull: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'countries',
      key: 'id',
    },
    allowNull: true,
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'applicant_profiles',
  timestamps: false,
});

export default ApplicantProfile;
