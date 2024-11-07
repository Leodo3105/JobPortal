import EmployerProfiles from '../../models/employer_profile.js';

// Cập nhật thông tin hồ sơ của Employer
export const updateProfile = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ URL
  const {
    company_name, website, address, district_id, city_id, country_id,
    description, social_media_links, logo,
  } = req.body; // Lấy thông tin từ body

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
