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
    }
}, {
    tableName: 'job_types', // Tên bảng là 'job_types'
    timestamps: false, // Không sử dụng timestamps tự động của Sequelize
});

export default JobType;
