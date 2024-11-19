import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import ApplicantProfile from './applicant_profile.js';
import Job from './job.js';

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  applicant_profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ApplicantProfile,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Job,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'wishlists',
  timestamps: false,
});

Wishlist.belongsTo(ApplicantProfile, { foreignKey: 'applicant_profile_id', as: 'applicantProfile' });
ApplicantProfile.hasMany(Wishlist, { foreignKey: 'applicant_profile_id', as: 'wishlists' });

Wishlist.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
Job.hasMany(Wishlist, { foreignKey: 'job_id', as: 'wishlists' });

export default Wishlist;
