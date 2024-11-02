const express = require('express');
const {
  addCountry, updateCountry, deleteCountry, getAllCountries,
  addCity, updateCity, deleteCity, getAllCities,
  addDistrict, updateDistrict, deleteDistrict, getAllDistricts
} = require('../controllers/admin/locationController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Country Routes
router.post('/countries', authenticateToken, authorizeRole('admin'), addCountry);
router.put('/countries/:id', authenticateToken, authorizeRole('admin'), updateCountry);
router.delete('/countries/:id', authenticateToken, authorizeRole('admin'), deleteCountry);
router.get('/countries', getAllCountries);

// City Routes
router.post('/cities', authenticateToken, authorizeRole('admin'), addCity);
router.put('/cities/:id', authenticateToken, authorizeRole('admin'), updateCity);
router.delete('/cities/:id', authenticateToken, authorizeRole('admin'), deleteCity);
router.get('/cities', getAllCities);

// District Routes
router.post('/districts', authenticateToken, authorizeRole('admin'), addDistrict);
router.put('/districts/:id', authenticateToken, authorizeRole('admin'), updateDistrict);
router.delete('/districts/:id', authenticateToken, authorizeRole('admin'), deleteDistrict);
router.get('/districts', getAllDistricts);

module.exports = router;
