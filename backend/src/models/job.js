import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import JobType from './job_type.js';
import Industry from './industry.js';
import EmployerProfile from './employer_profile.js';
import District from './district.js';
import City from './city.js';
import Country from './country.js';
import Applicant from './applicant.js';

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employer_profiles',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  industry_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Industry,
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  responsibilities: {
    type: DataTypes.TEXT,
  },
  requirements: {
    type: DataTypes.TEXT,
  },
  qualifications: {
    type: DataTypes.TEXT,
  },
  salary_range: {
    type: DataTypes.STRING,
  },
  benefits: {
    type: DataTypes.JSONB,
  },
  job_type_id: {
    type: DataTypes.INTEGER,
    references: {
      model: JobType,
      key: 'id',
    },
  },
  experience_level: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['Fresher', '1 year', '2 years', '4 years']],  
    },
  },
  district_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'districts',
      key: 'id',
    },
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'cities',
      key: 'id',
    },
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'countries',
      key: 'id',
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
  tableName: 'jobs',
  timestamps: false,
});

// Job - EmployerProfile: Một-nhiều 
Job.belongsTo(EmployerProfile, { foreignKey: 'employer_id', as: 'employer' });
EmployerProfile.hasMany(Job, { foreignKey: 'employer_id' });

// Job - Industry: Một-nhiều
Job.belongsTo(Industry, { foreignKey: 'industry_id' });
Industry.hasMany(Job, { foreignKey: 'industry_id' });

// Job - JobType: Một-nhiều
Job.belongsTo(JobType, { foreignKey: 'job_type_id' });
JobType.hasMany(Job, { foreignKey: 'job_type_id' });

// Job - Địa chỉ (District, City, Country): Một-nhiều
Job.belongsTo(District, { foreignKey: 'district_id' });
Job.belongsTo(City, { foreignKey: 'city_id' });
Job.belongsTo(Country, { foreignKey: 'country_id' });

//Job - Applicant: Một - Nhiều 
Applicant.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
Job.hasMany(Applicant, { foreignKey: 'job_id', as: 'applicants' });

export default Job;
