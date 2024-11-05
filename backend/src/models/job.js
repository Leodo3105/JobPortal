import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 
import JobType from './job_type.js'; 

const Job = sequelize.define('Job', {
    employer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employer_profiles', 
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
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
            model: 'job_types', // Liên kết với bảng job_types
            key: 'id',
        },
    },
    experience_level: {
        type: DataTypes.STRING,
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
    is_negotiable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Mặc định là không thể thương lượng
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
    tableName: 'jobs', // Đặt tên bảng là 'jobs'
    timestamps: false, // Không sử dụng timestamps tự động của Sequelize
});



export default Job;
