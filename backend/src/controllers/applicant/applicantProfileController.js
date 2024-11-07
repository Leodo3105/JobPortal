import ApplicantProfile from '../../models/applicant_profile.js'; // Import model

export async function updateApplicant(req, res) {
    try {
        // Lấy dữ liệu từ request body
        const { full_name, date_of_birth, phone_number, address, district_id, city_id, country_id, education, experience, skills, avatar, cv } = req.body;
        
        // Lấy id từ params
        const applicantId = req.params.id;

        // Kiểm tra xem ID có hợp lệ không
        if (!applicantId) {
            return res.status(400).json({ error: 'Applicant ID is required' });
        }

        // Kiểm tra xem ít nhất một trường trong body yêu cầu có giá trị không
        if (!full_name && !date_of_birth && !phone_number && !address && !district_id && !city_id && !country_id && !education && !experience && !skills && !avatar && !cv) {
            return res.status(400).json({ error: 'At least one field must be provided to update' });
        }

        // Tạo đối tượng dữ liệu cần cập nhật
        const updateData = {};

        // Chỉ thêm vào updateData những trường không rỗng
        if (full_name) updateData.full_name = full_name;
        if (date_of_birth) updateData.date_of_birth = date_of_birth;
        if (phone_number) updateData.phone_number = phone_number;
        if (address) updateData.address = address;
        if (district_id) updateData.district_id = district_id;
        if (city_id) updateData.city_id = city_id;
        if (country_id) updateData.country_id = country_id;
        if (education) updateData.education = education;
        if (experience) updateData.experience = experience;
        if (skills) updateData.skills = skills;
        if (avatar) updateData.avatar = avatar;
        if (cv) updateData.cv = cv;

        // Cập nhật thông tin ứng viên theo id
        const [updatedRowsCount, updatedApplicants] = await ApplicantProfile.update(updateData, {
            where: { id: applicantId },
            returning: true,  // Sử dụng tùy chọn này để lấy đối tượng đã được cập nhật
        });

        // Kiểm tra xem có bản ghi nào được cập nhật không
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Trả về thông tin ứng viên đã được cập nhật
        res.status(200).json({
            message: 'Applicant updated successfully',
            applicant: updatedApplicants[0],  // Trả về đối tượng đã cập nhật
        });

    } catch (error) {
        // Nếu có lỗi, trả về mã lỗi 500
        console.error(error);
        res.status(500).json({ error: 'Error updating applicant' });
    }
}
// update 