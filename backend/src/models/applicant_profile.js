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
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  fullname: {  // Đảm bảo khớp với tên cột trong cơ sở dữ liệu
    type: DataTypes.STRING,
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {  
    type: DataTypes.STRING(15),
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
