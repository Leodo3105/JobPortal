import Applicant from '../../models/applicant.js';
import Job from '../../models/job.js';
import ApplicantProfile from '../../models/applicant_profile.js';

// Apply for a Job
export async function applyJob(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ code: 'USER_ID_MISSING', message: 'User ID is missing' });
    }

    const jobId = req.params.jobId;

    // Fetch job and applicant profile in parallel to reduce database calls
    const [job, applicantProfile] = await Promise.all([
      Job.findByPk(jobId),
      ApplicantProfile.findOne({ where: { user_id: userId } }),
    ]);

    if (!job) {
      return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
    }

    if (!applicantProfile) {
      return res.status(404).json({ code: 'PROFILE_NOT_FOUND', message: 'Applicant profile not found' });
    }

    const applicantProfileId = applicantProfile.id;

    // Check if the application already exists
    const existingApplication = await Applicant.findOne({
      where: { applicant_profile_id: applicantProfileId, job_id: jobId },
    });

    if (existingApplication) {
      return res.status(400).json({ code: 'ALREADY_APPLIED', message: 'You have already applied for this job' });
    }

    // Create a new application
    const application = await Applicant.create({
      applicant_profile_id: applicantProfileId,
      job_id: jobId,
      status: 'Pending',
      apply_date: new Date(),
    });

    res.status(201).json({
      code: 'APPLICATION_SUCCESS',
      message: 'Job application successful',
      application,
      applicantProfile,
    });
  } catch (err) {
    console.error('Error applying for job:', err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'An error occurred. Please try again later.' });
  }
}

// Retrieve list of jobs applied for by a specific applicant
export const getAppliedJobs = async (req, res) => {
  try {
    const applicantProfileId = req.user?.applicant_profile_id;

    if (!applicantProfileId) {
      console.warn('Applicant profile ID missing in request');
      return res.status(400).json({
        code: 'PROFILE_ID_MISSING',
        message: 'Applicant profile ID is required',
      });
    }

    if (req.user.role !== 'applicant') {
      console.warn(`Forbidden access: User role ${req.user.role} is not allowed`);
      return res.status(403).json({
        code: 'FORBIDDEN',
        message: 'Only applicants can view applied jobs',
      });
    }

    const appliedJobs = await Applicant.findAll({
      where: { applicant_profile_id: applicantProfileId },
      include: [
        {
          model: Job,
          attributes: ['id', 'title', 'description', 'salary_range'],
          as: 'job',
        },
      ],
      order: [['apply_date', 'DESC']], // Sort by newest applications first
    });

    if (appliedJobs.length === 0) {
      console.info('No jobs applied by applicant profile:', applicantProfileId);
      return res.status(200).json({
        code: 'NO_APPLIED_JOBS',
        message: 'No jobs applied yet',
        jobs: [],
      });
    }

    console.info(`Applicant ${applicantProfileId} has applied for ${appliedJobs.length} job(s)`);
    res.status(200).json({ code: 'SUCCESS', jobs: appliedJobs });
  } catch (error) {
    console.error('Failed to retrieve jobs for applicant:', error);
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to retrieve jobs for applicant',
    });
  }
};

