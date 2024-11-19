import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Applicant = sequelize.define('Applicant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  applicant_profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'applicant_profiles',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  apply_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
    validate: {
      isIn: [['Pending', 'Accepted', 'Rejected']], // Chỉ cho phép các trạng thái hợp lệ
    },
  },
}, {
  tableName: 'applicants',
  timestamps: false,
});

// Định nghĩa quan hệ
Applicant.associate = (models) => {
  Applicant.belongsTo(models.ApplicantProfile, {
    foreignKey: 'applicant_profile_id',
    as: 'profile',
  });
};



export default Applicant;
