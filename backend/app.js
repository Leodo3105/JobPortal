import express, { json } from 'express';
import authRoutes from './src/routes/authRoutes.js'; 
import secureRoutes from './src/routes/secureRoutes.js'; 
import industryRoutes from './src/routes/industryRoutes.js';
import locationRoutes from './src/routes/locationRoutes.js';
import jobRoutes from './src/routes/jobRoutes.js';
import employerRoutes from './src/routes/employerRoutes.js';
import applicantRoutes from './src/routes/applicantRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import { sync } from './src/config/db.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/admin', profileRoutes);

// Protected Routes
app.use('/api/secure', secureRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
});
