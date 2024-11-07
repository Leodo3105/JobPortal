import ApplicantProfiles from '../../models/applicant_profile.js';

export const updateProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL
  const {
    fullname, date_of_birth, phone, address, district_id, city_id, country_id, 
    education, experience, skills, social_media_links,
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
