import ApplicantProfiles from '../../models/applicant_profile.js';

export const updateProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL
  const {
    fullname, date_of_birth, phone, address, district_id, city_id, country_id, education, experience, skills, social_media_links,
  } = req.body; // Lấy thông tin từ body

  try {
    // Kiểm tra xem profile của applicant có tồn tại không
    const applicantProfile = await ApplicantProfiles.findOne({ where: { user_id: userId } });
    if (!applicantProfile) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    // Cập nhật thông tin profile
    await applicantProfile.update({
      fullname, date_of_birth, phone, address, district_id, city_id, country_id,
      education, experience, skills, social_media_links,
    });

    res.status(200).json({ message: 'Profile updated successfully', profile: applicantProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the profile', error });
  }
};


//apply job
import JobApplication from '../../models/applicant.js';

export const applyForJob = async (req, res) => {
  const { jobId } = req.params;  // Lấy jobId từ URL
  const applicantId = req.user.id; // Lấy ID của người dùng đã đăng nhập (ứng viên)

  try {
    // Kiểm tra nếu ứng viên đã apply vào công việc này
    const existingApplication = await JobApplication.findOne({
      where: { applicant_profile_id: applicantId, job_id: Id },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Tạo bản ghi ứng tuyển mới
    const newApplication = await JobApplication.create({
      applicant_profile_id: applicantId,
      job_id: jobId,
      status: 'Pending',
    });

    res.status(201).json({ message: 'Job application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Failed to submit job application:', error);
    res.status(500).json({ message: 'Failed to submit job application', error });
  }
};
