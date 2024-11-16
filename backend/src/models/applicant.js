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
            model: 'applicant_profiles', // Tên bảng tham chiếu
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'jobs', // Tên bảng tham chiếu
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
    },
}, {
    tableName: 'applicants',
    timestamps: false, 
});

export default Applicant;