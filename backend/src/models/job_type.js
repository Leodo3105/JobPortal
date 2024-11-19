import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const JobType = sequelize.define('JobType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
    set(value) {
      this.setDataValue('name', value.toLowerCase()); // Chuyển tất cả tên sang chữ thường
    }
  }
}, {
  tableName: 'job_types',
  timestamps: false, // Không sử dụng timestamps tự động của Sequelize
});

export default JobType;
