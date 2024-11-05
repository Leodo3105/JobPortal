import Job from '../../models/job.js';
import JobType from '../../models/job_type.js';
import Op from 'sequelize'; 

// Tạo công việc mới
export async function createJob(req, res) {
    try {
        const job = await Job.create(req.body);
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error });
    }
}

// Lấy danh sách công việc (với tùy chọn tìm kiếm)
export async function getJobs(req, res) {
    try {
        const { title, company_name } = req.query;
        let where = {};

        if (title) {
            where.title = { [Op.iLike]: `%${title}%` }; // Tìm kiếm theo tiêu đề
        }
        if (company_name) {
            where.company_name = { [Op.iLike]: `%${company_name}%` }; // Tìm kiếm theo tên công ty
        }

        const jobs = await Job.findAll({
            where,
            include: { model: JobType, attributes: ['name'] }, // Bao gồm tên loại công việc
        });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs', error });
    }
}

// Lấy chi tiết một công việc
export async function getJobById(req, res) {
    try {
        const job = await Job.findByPk(req.params.id, {
            include: { model: JobType, attributes: ['name'] }, // Bao gồm tên loại công việc
        });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job', error });
    }
}

// Cập nhật công việc
export async function updateJob(req, res) {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.update(req.body);
        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update job', error });
    }
}

// Xóa công việc
export async function deleteJob(req, res) {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.destroy();
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete job', error });
    }
}
