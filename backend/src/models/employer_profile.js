import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const EmployerProfiles = sequelize.define('EmployerProfile', {
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
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
}, {
    tableName: 'employer_profiles',
    timestamps: false,
});
  
export default EmployerProfiles;
