const sequelize = require('../config/db'); // Đường dẫn đúng tới file cấu hình db

// Import tất cả các model
const User = require('./user');
const EmployerProfile = require('./employer_profile').default;
const District = require('./district');
const City = require('./city');
const Country = require('./country');
const Industry = require('./industry');
const JobType = require('./job_type');
const Job = require('./job').default;

// Định nghĩa các mối quan hệ giữa các model

// User - EmployerProfile: Một-một
EmployerProfile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(EmployerProfile, { foreignKey: 'user_id' });

// EmployerProfile - Địa chỉ (District, City, Country): Một-nhiều
EmployerProfile.belongsTo(District, { foreignKey: 'district_id' });
EmployerProfile.belongsTo(City, { foreignKey: 'city_id' });
EmployerProfile.belongsTo(Country, { foreignKey: 'country_id' });

// Job - EmployerProfile: Một-nhiều (Một Employer có thể có nhiều Job)
Job.belongsTo(EmployerProfile, { foreignKey: 'employer_id' });
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

// Quan hệ phân cấp: District, City, Country
// Mỗi District (quận/huyện) thuộc về một City (thành phố)
District.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(District, { foreignKey: 'city_id' });

// Mỗi City (thành phố) thuộc về một Country (quốc gia)
City.belongsTo(Country, { foreignKey: 'country_id' });
Country.hasMany(City, { foreignKey: 'country_id' });

// Export tất cả model để có thể sử dụng ở nơi khác trong dự án
module.exports = {
    sequelize,
    User,
    EmployerProfile,
    District,
    City,
    Country,
    Industry,
    JobType,
    Job
};
