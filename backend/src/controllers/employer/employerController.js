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
  const userRole = req.user?.role; // Lấy vai trò từ token

  // Kiểm tra nếu jobId không được cung cấp
  if (!jobId) {
    return res.status(400).json({ code: 'JOB_ID_MISSING', message: 'Job ID is required' });
  }

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
              attributes: ['id', 'fullname', 'phone'], 
              include: [
            {
              model: User,
              as: 'user', // Alias khớp với mối quan hệ đã định nghĩa
              attributes: ['email'], // Lấy email từ User
            },
          ],
            },
          ],
        },
      ],
    });

    // Kiểm tra nếu job không tồn tại
    if (!job) {
      return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
    }

    // Kiểm tra quyền sở hữu job
    if (userRole === 'employer' && job.employer_id.toString() !== userId.toString()) {
      console.warn(`Employer ${userId} tried to access job ${jobId} they do not own.`);
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this job',
      });
    }

    // Kiểm tra nếu không có ứng viên nào apply
    if (!job.applicants || job.applicants.length === 0) {
      console.info(`No applicants found for job ID ${jobId}`);
      return res.status(200).json({
        code: 'NO_APPLICANTS',
        message: 'No applicants found for this job',
        applicants: [],
      });
    }

    // Trả về danh sách ứng viên
    const applicants = job.applicants.map((applicant) => ({
      applicantId: applicant.id,
      profile: {
        id: applicant.profile.id,
        fullname: applicant.profile.fullname,
        phone: applicant.profile.phone,
        email: applicant.profile.email,
      },
      applyDate: applicant.apply_date,
      status: applicant.status,
    }));

    console.info(`Job ${jobId} has ${applicants.length} applicant(s)`);
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


