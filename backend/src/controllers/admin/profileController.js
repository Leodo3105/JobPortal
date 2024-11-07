import ApplicantProfiles from '../../models/applicant_profile.js';
import EmployerProfiles from '../../models/employer_profile.js';


// Ứng viên
// Lấy danh sách 
export const getApplicantProfiles = async (req, res) => {
    try {
      const applicantProfiles = await ApplicantProfiles.findAll({
        attributes: ['user_id', 'fullname', 'email', 'phone'] // Lấy các trường quan trọng
      });
      res.status(200).json({ profiles: applicantProfiles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving profiles', error });
    }
};

// Xem chi tiết hồ sơ 
export const getApplicantProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL

  try {
    const applicantProfile = await ApplicantProfiles.findOne({ where: { user_id: userId } });
    if (!applicantProfile) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    res.status(200).json({ profile: applicantProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the profile', error });
  }
};

// Xóa hồ sơ 
export const deleteApplicantProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL

  try {
    const result = await ApplicantProfiles.destroy({ where: { user_id: userId } });
    if (result === 0) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    res.status(200).json({ message: 'Applicant profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the profile', error });
  }
};

// Nhà tuyển dụng

// Lấy danh sách hồ sơ 
export const getEmployerProfiles = async (req, res) => {
    try {
      const employerProfiles = await EmployerProfiles.findAll({
        attributes: ['user_id', 'company_name', 'email'] // Lấy các trường quan trọng
      });
      res.status(200).json({ profiles: employerProfiles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving profiles', error });
    }
  };

// Xem chi tiết hồ sơ 
export const getEmployerProfile = async (req, res) => {
    const { userId } = req.params; // Lấy userId từ URL
  
    try {
      const employerProfile = await EmployerProfiles.findOne({ where: { user_id: userId } });
      if (!employerProfile) {
        return res.status(404).json({ message: 'Employer profile not found' });
      }
  
      res.status(200).json({ profile: employerProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving the profile', error });
    }
};
  
// Xóa hồ sơ 
export const deleteEmployerProfile = async (req, res) => {
    const { userId } = req.params; // Lấy userId từ URL
  
    try {
      const result = await EmployerProfiles.destroy({ where: { user_id: userId } });
      if (result === 0) {
        return res.status(404).json({ message: 'Employer profile not found' });
      }
  
      res.status(200).json({ message: 'Employer profile deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the profile', error });
    }
};
