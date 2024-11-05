// import { find, findById, findByIdAndDelete } from '../../models/applicant_profile.js';

// export async function getAllApplicants(_req, res) {
//     try {
//         const applicants = await find();
//         res.status(200).json(applicants);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching applicants' });
//     }
// }

// export async function getApplicantById(req, res) {
//     try {
//         const applicant = await findById(req.params.id);
//         if (applicant) {
//             res.status(200).json(applicant);
//         } else {
//             res.status(404).json({ error: 'Applicant not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching applicant' });
//     }
// }

// export async function deleteApplicant(req, res) {
//     try {
//         const result = await findByIdAndDelete(req.params.id);
//         if (result) {
//             res.status(200).json({ message: 'Applicant deleted successfully' });
//         } else {
//             res.status(404).json({ error: 'Applicant not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error deleting applicant' });
//     }
// }
