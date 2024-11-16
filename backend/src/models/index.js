import sequelize from '../config/db.js'; // Đường dẫn đúng tới file cấu hình db

// Import tất cả các model
import User from './user.js';
import EmployerProfile from './employer_profile.js';
import ApplicantProfile from './applicant_profile.js';
import District from './district.js';
import City from './city.js';
import Country from './country.js';
import Industry from './industry.js';
import JobType from './job_type.js';
import Job from './job.js';
import Applicant from './applicant.js';

// Định nghĩa các mối quan hệ giữa các model

// 1. User - EmployerProfile: Một-một
EmployerProfile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(EmployerProfile, { foreignKey: 'user_id' });

// 2. User - ApplicantProfile: Một-một
ApplicantProfile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(ApplicantProfile, { foreignKey: 'user_id' });

// 3. EmployerProfile - Địa chỉ (District, City, Country): Một-nhiều
EmployerProfile.belongsTo(District, { foreignKey: 'district_id' });
EmployerProfile.belongsTo(City, { foreignKey: 'city_id' });
EmployerProfile.belongsTo(Country, { foreignKey: 'country_id' });

// 4. Job - EmployerProfile: Một-nhiều (Một Employer có thể có nhiều Job)
Job.belongsTo(EmployerProfile, { foreignKey: 'employer_id' });
EmployerProfile.hasMany(Job, { foreignKey: 'employer_id' });

// 5. Job - Industry: Một-nhiều
Job.belongsTo(Industry, { foreignKey: 'industry_id' });
Industry.hasMany(Job, { foreignKey: 'industry_id' });

// 6. Job - JobType: Một-nhiều
Job.belongsTo(JobType, { foreignKey: 'job_type_id' });
JobType.hasMany(Job, { foreignKey: 'job_type_id' });

// 7. Job - Địa chỉ (District, City, Country): Một-nhiều
Job.belongsTo(District, { foreignKey: 'district_id' });
Job.belongsTo(City, { foreignKey: 'city_id' });
Job.belongsTo(Country, { foreignKey: 'country_id' });

// 8. Quan hệ phân cấp: District, City, Country
District.belongsTo(City, { foreignKey: 'city_id' });
City.hasMany(District, { foreignKey: 'city_id' });
City.belongsTo(Country, { foreignKey: 'country_id' });
Country.hasMany(City, { foreignKey: 'country_id' });

// 9. Quan hệ Job và Applicant: Một Job có nhiều Applicants, một Applicant thuộc về một Job
Applicant.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
Job.hasMany(Applicant, { foreignKey: 'job_id', as: 'applicants' });

// 10. Quan hệ Applicant và ApplicantProfile: Một Applicant có một ApplicantProfile
Applicant.hasOne(ApplicantProfile, { foreignKey: 'applicant_profile_id', as: 'profile' });
ApplicantProfile.belongsTo(Applicant, { foreignKey: 'id', as: 'applicant' });


// Export tất cả model để có thể sử dụng ở nơi khác trong dự án
export default {
    sequelize,
    User,
    EmployerProfile,
    ApplicantProfile,
    District,
    City,
    Country,
    Industry,
    JobType,
    Job,
    Applicant
};
