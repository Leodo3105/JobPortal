import EmployerProfiles from '../../models/employer_profile.js';

// Cập nhật thông tin hồ sơ của Employer
export const updateProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL
  const {
    company_name, website, address, district_id, city_id, country_id,
    description, social_media_links, logo,
  } = req.body; // Lấy thông tin từ body
//
  try {
    // Kiểm tra xem hồ sơ employer có tồn tại không
    const employerProfile = await EmployerProfiles.findOne({ where: { user_id: userId } });
    if (!employerProfile) {
      return res.status(404).json({ message: 'Employer profile not found' });
    }

    // Cập nhật thông tin hồ sơ
    await employerProfile.update({
      company_name, website, address, district_id, city_id, country_id,
      description, social_media_links, logo,
    });

    res.status(200).json({ message: 'Profile updated successfully', profile: employerProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the profile', error });
  }
};


import JobApplication from '../../models/job_application.js';
import ApplicantProfiles from '../../models/applicant_profile.js';

// Xem danh sách ứng viên đã apply vào job
export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params; // Lấy jobId từ URL

  try {
    // Tìm các ứng viên đã ứng tuyển vào công việc này
    const applications = await JobApplication.findAll({
      where: { id: jobId },
      include: [
        {
          model: ApplicantProfiles,
          attributes: ['id', 'fullname', 'phone', 'email', 'address', 'city_id', 'country_id'],
        },
      ],
    });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applicants found for this job' });
    }

    // Lấy danh sách ứng viên từ các bản ghi `JobApplication`
    const applicants = applications.map((application) => application.ApplicantProfile);

    res.status(200).json({ applicants });
  } catch (error) {
    console.error('Failed to retrieve applicants:', error);
    res.status(500).json({ message: 'Failed to retrieve applicants', error });
  }
};