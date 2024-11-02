const express = require('express');
const authRoutes = require('./src/routes/authRoutes'); 
const secureRoutes = require('./src/routes/secureRoutes'); 
const industryRoutes = require('./src/routes/industryRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const employerRoutes = require('./src/routes/employerRoutes');
const sequelize = require('./src/config/db');

require('dotenv').config();

const app = express();
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employer', employerRoutes);

// Protected Routes
app.use('/api/secure', secureRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
});
