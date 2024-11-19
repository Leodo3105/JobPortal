import ApplicantProfile from '../../models/applicant_profile.js';
import EmployerProfile from '../../models/employer_profile.js';
import Applicant from '../../models/applicant.js';
import Job from '../../models/job.js';
import User from '../../models/user.js';

// Cập nhật thông tin hồ sơ của Employer
export const updateProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL
  const {
    company_name, website, address, district_id, city_id, country_id,
    description, social_media_links, logo,
  } = req.body; 

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
    console.error('Error updating employer profile:', error); 
    res.status(500).json({ message: 'An error occurred while updating the profile', error });
  }
};

// Retrieve list of applicants for a specific job
export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user?.userId; // Lấy userId từ token
  const userRole = req.user?.role; // Lấy role từ token

  if (!jobId) {
    return res.status(400).json({ code: 'JOB_ID_MISSING', message: 'Job ID is required' });
  }

  try {
    // Tìm job theo ID
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
              attributes: ['id', 'fullname', 'phone'],
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['email'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!job) {
      return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
    }

    // Kiểm tra quyền sở hữu dựa trên employer_profiles
    const employerProfile = await EmployerProfile.findOne({
      where: { id: job.employer_id },
    });

    if (!employerProfile || employerProfile.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this job',
      });
    }

    // Nếu không có ứng viên apply
    if (!job.applicants || job.applicants.length === 0) {
      return res.status(200).json({
        code: 'NO_APPLICANTS',
        message: 'No applicants found for this job',
        applicants: [],
      });
    }

    // Lấy danh sách ứng viên
    const applicants = job.applicants.map((applicant) => ({
      applicantId: applicant.id,
      profile: {
        id: applicant.profile.id,
        fullname: applicant.profile.fullname,
        phone: applicant.profile.phone,
        email: applicant.profile.user.email,
      },
      applyDate: applicant.apply_date,
      status: applicant.status,
    }));

    res.status(200).json({
      code: 'SUCCESS',
      message: 'Applicants retrieved successfully',
      applicants,
    });
  } catch (error) {
    console.error('Failed to retrieve applicants:', error);
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Internal server error. Please try again later.',
    });
  }
};



