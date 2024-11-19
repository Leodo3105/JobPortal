import { Router } from 'express';
import { addCountry, updateCountry, deleteCountry, getAllCountries, searchCountries,
         addCity, updateCity, deleteCity, getAllCities, searchCities,
         addDistrict, updateDistrict, deleteDistrict, getAllDistricts, searchDistricts }
         from '../controllers/admin/locationController.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';

const router = Router();

// Country Routes
router.post('/countries/add', authenticateToken, authorizeRole('admin'), addCountry);
router.put('/countries/update/:id', authenticateToken, authorizeRole('admin'), updateCountry);
router.delete('/countries/delete/:id', authenticateToken, authorizeRole('admin'), deleteCountry);
router.get('/countries/list', getAllCountries);
router.get('/countries/search', searchCountries);

// City Routes
router.post('/cities/add', authenticateToken, authorizeRole('admin'), addCity);
router.put('/cities/update/:id', authenticateToken, authorizeRole('admin'), updateCity);
router.delete('/cities/delete/:id', authenticateToken, authorizeRole('admin'), deleteCity);
router.get('/cities/list', getAllCities);
router.get('/cities/search', searchCities);

// District Routes
router.post('/districts/add', authenticateToken, authorizeRole('admin'), addDistrict);
router.put('/districts/update/:id', authenticateToken, authorizeRole('admin'), updateDistrict);
router.delete('/districts/delete/:id', authenticateToken, authorizeRole('admin'), deleteDistrict);
router.get('/districts/list', getAllDistricts);
router.get('/districts/search', searchDistricts);

export default router;
