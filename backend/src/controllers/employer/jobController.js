import Job from '../../models/job.js';
import JobType from '../../models/job_type.js';
import Op from 'sequelize'; 

// Tạo công việc mới
export async function createJob(req, res) {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ code: 'JOB_CREATED', message: 'Job created successfully', job });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ code: 'JOB_CREATION_FAILED', message: 'Failed to create job', error: error.message });
    }
}

// Lấy danh sách công việc (với tùy chọn tìm kiếm)
export async function getJobs(req, res) {
    try {
        const { title, company_name } = req.query;
        const where = {};

        // Add search conditions if provided
        if (title) {
            where.title = { [Op.iLike]: `%${title}%` }; // Search by title
        }
        if (company_name) {
            where.company_name = { [Op.iLike]: `%${company_name}%` }; // Search by company name
        }

        const jobs = await Job.findAll({
            where,
            include: { model: JobType, attributes: ['name'] }, // Include job type name
        });
        
        if (jobs.length === 0) {
            return res.status(404).json({ code: 'NO_JOBS_FOUND', message: 'No jobs found matching the criteria' });
        }

        res.status(200).json({ code: 'JOBS_RETRIEVED', message: 'Jobs retrieved successfully', jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ code: 'JOB_FETCH_FAILED', message: 'Failed to fetch jobs', error: error.message });
    }
}

// Lấy chi tiết một công việc
export async function getJobById(req, res) {
    try {
        const job = await Job.findByPk(req.params.id, {
            include: { model: JobType, attributes: ['name'] },
        });
        if (!job) {
            return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
        }
        res.status(200).json({ code: 'JOB_RETRIEVED', message: 'Job retrieved successfully', job });
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ code: 'JOB_FETCH_FAILED', message: 'Failed to fetch job', error: error.message });
    }
}

// Cập nhật công việc
export async function updateJob(req, res) {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
        }

        await job.update(req.body);
        res.status(200).json({ code: 'JOB_UPDATED', message: 'Job updated successfully', job });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ code: 'JOB_UPDATE_FAILED', message: 'Failed to update job', error: error.message });
    }
}

// Xóa công việc
export async function deleteJob(req, res) {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ code: 'JOB_NOT_FOUND', message: 'Job not found' });
        }

        await job.destroy();
        res.status(200).json({ code: 'JOB_DELETED', message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ code: 'JOB_DELETION_FAILED', message: 'Failed to delete job', error: error.message });
    }
}
