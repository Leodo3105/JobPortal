import Applicant from '../../models/applicant.js';
import Job from '../../models/job.js';
import ApplicantProfile from '../../models/applicant_profile.js';


export async function applyJob(req, res) {
  try {
    const userId = req.user?.userId; // Lấy ID của user từ authenticated user

    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const jobId = req.params.jobId; // Lấy ID của job từ route parameters

    // Kiểm tra nếu công việc tồn tại
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Tìm `ApplicantProfile` dựa vào `user_id` để lấy `applicant_profile_id`
    const applicantProfile = await ApplicantProfile.findOne({
      where: { user_id: userId },
    });

    if (!applicantProfile) {
      return res.status(404).json({ message: 'Applicant profile not found' });
    }

    const applicantProfileId = applicantProfile.id;

    // Kiểm tra nếu người dùng đã apply cho công việc này
    const existingApplication = await Applicant.findOne({
      where: { applicant_profile_id: applicantProfileId, job_id: jobId },
    });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Tạo một application mới
    const application = await Applicant.create({
      applicant_profile_id: applicantProfileId,
      job_id: jobId,
      status: 'Pending',
      apply_date: new Date(),
    });

    // Trả về thành công với chi tiết application và applicant profile
    res.status(201).json({
      message: 'Job application successful',
      application,
      applicantProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred. Please try again' });
  }
}

// Lấy danh sách job đã apply
export async function getAppliedJobs(req, res) {
  const { applicantId } = req.params;

  try {
    const applicant = await Applicant.findOne({
      where: { id: applicantId },
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'description'], // Chọn các trường bạn muốn lấy từ Job
        },
      ],
    });

    if (!applicant) {
      return res.status(404).json({ message: 'No jobs found for this applicant' });
    }

    res.status(200).json(applicant);
  } catch (error) {
    console.error('Failed to retrieve jobs for applicant:', error);
    res.status(500).json({ message: 'Failed to retrieve jobs for applicant', error });
  }
};




