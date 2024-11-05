import { Router } from 'express';
import { addCountry, updateCountry, deleteCountry, getAllCountries, searchCountries,
         addCity, updateCity, deleteCity, getAllCities, searchCities,
         addDistrict, updateDistrict, deleteDistrict, getAllDistricts, searchDistricts }
         from '../controllers/admin/locationController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

// Country Routes
router.post('/countries', authenticateToken, authorizeRole('admin'), addCountry);
router.put('/countries/:id', authenticateToken, authorizeRole('admin'), updateCountry);
router.delete('/countries/:id', authenticateToken, authorizeRole('admin'), deleteCountry);
router.get('/countries', getAllCountries);
router.get('/countries/search', searchCountries);

// City Routes
router.post('/cities', authenticateToken, authorizeRole('admin'), addCity);
router.put('/cities/:id', authenticateToken, authorizeRole('admin'), updateCity);
router.delete('/cities/:id', authenticateToken, authorizeRole('admin'), deleteCity);
router.get('/cities', getAllCities);
router.get('/cities/search', searchCities);

// District Routes
router.post('/districts', authenticateToken, authorizeRole('admin'), addDistrict);
router.put('/districts/:id', authenticateToken, authorizeRole('admin'), updateDistrict);
router.delete('/districts/:id', authenticateToken, authorizeRole('admin'), deleteDistrict);
router.get('/districts', getAllDistricts);
router.get('/districts/search', searchDistricts);

export default router;
