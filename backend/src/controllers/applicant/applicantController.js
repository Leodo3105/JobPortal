import Applicant from '../models/applicant.js'; 
import Job from '../models/job.js'; 
import ApplicantProfile from '../models/applicant_profile.js';

const applyJob = async (applicantProfileId, jobId) => {
    try {
        // Kiểm tra xem ứng viên có tồn tại không
        const applicantProfile = await ApplicantProfile.findByPk(applicantProfileId);
        if (!applicantProfile) {
            throw new Error('Ứng viên không tồn tại');
        }

        // Kiểm tra xem công việc có tồn tại không
        const job = await Job.findByPk(jobId);
        if (!job) {
            throw new Error('Công việc không tồn tại');
        }

        // Kiểm tra ứng viên đã ứng tuyển vào công việc này chưa
        const existingApplicant = await Applicant.findOne({
            where: {
                applicant_profile_id: applicantProfileId,
                job_id: jobId
            }
        });

        if (existingApplicant) {
            throw new Error('Bạn đã ứng tuyển vào công việc này rồi');
        }

        // Tạo bản ghi mới trong bảng applicants
        const newApplicant = await Applicant.create({
            applicant_profile_id: applicantProfileId,
            job_id: jobId,
            status: 'Pending', // Mặc định trạng thái là 'Pending'
        });

        // Trả về thông tin ứng viên vừa được thêm vào
        return newApplicant;

    } catch (error) {
        console.error('Lỗi khi ứng tuyển:', error.message);
        throw error; // Ném lỗi ra ngoài để xử lý ở nơi gọi
    }
};

export default applyJob;