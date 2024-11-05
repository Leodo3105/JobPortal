import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';// Đảm bảo đường dẫn tới file cấu hình đúng

const EmployerProfile = sequelize.define('EmployerProfile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    company_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    website: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    district_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'districts',
            key: 'id'
        }
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'cities', 
            key: 'id'
        }
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'countries', 
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    social_media_links: {
        type: DataTypes.JSONB, // JSONB phù hợp với PostgreSQL để lưu trữ các liên kết mạng xã hội
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'employer_profiles',
    timestamps: false 
});

export default EmployerProfile;
