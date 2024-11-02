const { EmployerProfile } = require('../../models');

// Cập nhật thông tin hồ sơ của employer
exports.updateProfile = async (req, res) => {
    try {
        const employerId = req.user.id; // Lấy id từ token (id của employer đang đăng nhập)
        
        // Tìm employer profile trong db
        let profile = await EmployerProfile.findOne({ where: { user_id: employerId } });
        
        if (!profile) {
            return res.status(404).json({ message: "Employer profile not found" });
        }

        // Cập nhật thông tin từ request body
        const { name, district_id, city_id, country_id, website, contact_email, phone } = req.body;

        if (name !== undefined) profile.name = name;
        if (district_id !== undefined) profile.district_id = district_id;
        if (city_id !== undefined) profile.city_id = city_id;
        if (country_id !== undefined) profile.country_id = country_id;
        if (website !== undefined) profile.website = website;
        if (contact_email !== undefined) profile.contact_email = contact_email;
        if (phone !== undefined) profile.phone = phone;

        await profile.save(); // Lưu thay đổi vào database

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error('Failed to update profile:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};
