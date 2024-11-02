const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Giả sử bạn đã cấu hình Sequelize trong db.js

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

module.exports = JobType;
