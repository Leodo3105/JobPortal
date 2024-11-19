import ApplicantProfiles from '../../models/applicant_profile.js';
import EmployerProfiles from '../../models/employer_profile.js';
import User from '../../models/user.js'


// Ứng viên
// Lấy danh sách hồ sơ ứng viên
export const getApplicantProfiles = async (req, res) => {
    try {
      const applicantProfiles = await ApplicantProfiles.findAll({
        attributes: ['user_id', 'fullname', 'phone'], 
        include: [
        {
          model: User,
          attributes: ['email'], 
          as: 'user', 
        },
      ],
      });
      res.status(200).json({ profiles: applicantProfiles });
    } catch (error) {
      console.error('Error retrieving applicant profiles:', error); 
      res.status(500).json({ message: 'An error occurred while retrieving profiles', error });
    }
};

// Xem chi tiết hồ sơ ứng viên
export const getApplicantProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const applicantProfile = await ApplicantProfiles.findOne({ where: { user_id: userId } });
    if (!applicantProfile) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    res.status(200).json({ profile: applicantProfile });
  } catch (error) {
    console.error('Error retrieving applicant profile:', error); 
    res.status(500).json({ message: 'An error occurred while retrieving the profile', error });
  }
};

// Xóa hồ sơ ứng viên
export const deleteApplicantProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await ApplicantProfiles.destroy({ where: { user_id: userId } });
    if (result === 0) { 
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    res.status(200).json({ message: 'Applicant profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting applicant profile:', error); 
    res.status(500).json({ message: 'An error occurred while deleting the profile', error });
  }
};

// Nhà tuyển dụng
// Lấy danh sách hồ sơ nhà tuyển dụng
export const getEmployerProfiles = async (req, res) => {
    try {
      const employerProfiles = await EmployerProfiles.findAll({
        attributes: ['user_id', 'company_name'], 
        include: [
        {
          model: User,
          as: 'user', // Tên alias của quan hệ
          attributes: ['email'], // Chỉ lấy cột email từ bảng users
        },
      ],
      });
      res.status(200).json({ profiles: employerProfiles });
    } catch (error) {
      console.error('Error retrieving employer profiles:', error); 
      res.status(500).json({ message: 'An error occurred while retrieving profiles', error });
    }
};

// Xem chi tiết hồ sơ nhà tuyển dụng
export const getEmployerProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const employerProfile = await EmployerProfiles.findOne({ where: { user_id: userId } });
    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    res.status(200).json({ profile: employerProfile });
  } catch (error) {
    console.error('Error retrieving employer profile:', error); 
    res.status(500).json({ message: 'An error occurred while retrieving the profile', error });
  }
};

// Xóa hồ sơ nhà tuyển dụng
export const deleteEmployerProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await EmployerProfiles.destroy({ where: { user_id: userId } });
    if (result === 0) { 
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    res.status(200).json({ message: 'Employer profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting employer profile:', error); 
    res.status(500).json({ message: 'An error occurred while deleting the profile', error });
  }
};
