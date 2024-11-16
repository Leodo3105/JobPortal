import ApplicantProfile from '../../models/applicant_profile.js';
import EmployerProfile from '../../models/employer_profile.js';
import Applicant from '../../models/applicant.js';
import Job from '../../models/job.js';

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
    const employerProfile = await EmployerProfile.findOne({ where: { user_id: userId } });
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

// Xem danh sách ứng viên đã apply vào job
export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await Job.findOne({
      where: { id: jobId },
      include: [
        {
          model: Applicant,
          as: 'applicants',
          include: [
            {
              model: ApplicantProfile,
              as: 'profile',
              attributes: ['id', 'fullname', 'phone', 'email'],
            },
          ],
        },
      ],
    });

    if (!job || job.applicants.length === 0) {
      return res.status(404).json({ message: 'No applicants found for this job' });
    }

    res.status(200).json(job.applicants);
  } catch (error) {
    console.error('Failed to retrieve applicants:', error);
    res.status(500).json({ message: 'Failed to retrieve applicants', error });
  }
};

