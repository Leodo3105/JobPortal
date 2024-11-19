import ApplicantProfiles from '../../models/applicant_profile.js';

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    fullname, date_of_birth, phone, address, district_id, city_id, country_id,
    education, experience, skills, social_media_links,
  } = req.body;

  try {
    // Kiểm tra xem hồ sơ của applicant có tồn tại không
    const applicantProfile = await ApplicantProfiles.findOne({ where: { user_id: userId } });
    if (!applicantProfile) {
      console.error('Applicant profile not found for user_id:', userId); // Log lỗi chi tiết
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    // Xác thực dữ liệu đầu vào (giả sử có thư viện xác thực)
    if (!fullname || !phone || !education) {
      return res.status(400).json({ message: 'Full name, phone, and education are required.' });
    }
    if (phone && !/^\d+$/.test(phone)) {
      return res.status(400).json({ message: 'Phone must contain only numbers.' });
    }
    if (date_of_birth && !/^\d{4}-\d{2}-\d{2}$/.test(date_of_birth)) {
      return res.status(400).json({ message: 'Date of birth must be in the format YYYY-MM-DD.' });
    }

    // Cập nhật thông tin profile
    await applicantProfile.update({
      fullname, date_of_birth, phone, address, district_id, city_id, country_id,
      education, experience, skills, social_media_links,
    });

    res.status(200).json({ message: 'Profile updated successfully', profile: applicantProfile });
  } catch (error) {
    console.error('Error updating profile:', error); // Log lỗi chi tiết
    res.status(500).json({ message: 'An error occurred while updating the profile', error });
  }
};
