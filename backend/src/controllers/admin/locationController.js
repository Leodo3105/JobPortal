import Country from '../../models/country.js';
import City from '../../models/city.js';
import District from '../../models/district.js';
import { Op } from 'sequelize';


// Country
export const addCountry = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCountry = await Country.findOne({ where: { name } });
    if (existingCountry) {
      return res.status(400).json({ code: 'COUNTRY_EXISTS', message: 'Country already exists' });
    }

    const country = await Country.create({ name });
    res.status(201).json({ code: 'COUNTRY_ADDED', message: 'Country added successfully', country });
  } catch (error) {
    console.error('Error adding country:', error);
    res.status(500).json({ code: 'ADD_COUNTRY_FAILED', message: 'An error occurred while adding the country', error: error.message });
  }
};

export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ code: 'COUNTRY_NOT_FOUND', message: 'Country not found' });
    }

    country.name = name || country.name;
    await country.save();

    res.status(200).json({ code: 'COUNTRY_UPDATED', message: 'Country updated successfully', country });
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ code: 'UPDATE_COUNTRY_FAILED', message: 'An error occurred while updating the country', error: error.message });
  }
};


export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ code: 'COUNTRY_NOT_FOUND', message: 'Country not found' });
    }

    await country.destroy();
    res.status(200).json({ code: 'COUNTRY_DELETED', message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ code: 'DELETE_COUNTRY_FAILED', message: 'An error occurred while deleting the country', error: error.message });
  }
};

export const getAllCountries = async (_req, res) => {
  try {
    const countries = await Country.findAll({ order: [['name', 'ASC']] });
    res.status(200).json({ code: 'COUNTRIES_RETRIEVED', message: 'Countries retrieved successfully', countries });
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ code: 'FETCH_COUNTRIES_FAILED', message: 'An error occurred while fetching countries', error: error.message });
  }
};

export const searchCountries = async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      order: [['name', 'ASC']],
    });

    if (countries.length === 0) {
      return res.status(404).json({ code: 'NO_COUNTRIES_FOUND', message: 'No countries match the search criteria' });
    }

    res.status(200).json({ code: 'COUNTRIES_SEARCHED', message: 'Countries search successful', countries });
  } catch (error) {
    console.error('Error searching countries:', error);
    res.status(500).json({ code: 'SEARCH_COUNTRIES_FAILED', message: 'An error occurred while searching countries', error: error.message });
  }
};


// City
// Add a new city
export const addCity = async (req, res) => {
  const { name, countryId } = req.body;

  try {
    const country = await Country.findByPk(countryId);
    if (!country) {
      return res.status(404).json({ code: 'COUNTRY_NOT_FOUND', message: 'Country not found' });
    }

    const city = await City.create({ name, countryId });
    res.status(201).json({ code: 'CITY_ADDED', message: 'City added successfully', city });
  } catch (error) {
    console.error('Error adding city:', error);
    res.status(500).json({ code: 'ADD_CITY_FAILED', message: 'An error occurred while adding the city', error: error.message });
  }
};

// Update an existing city
export const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name, countryId } = req.body;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ code: 'CITY_NOT_FOUND', message: 'City not found' });
    }

    // Check if countryId is provided and valid
    if (countryId) {
      const country = await Country.findByPk(countryId);
      if (!country) {
        return res.status(404).json({ code: 'COUNTRY_NOT_FOUND', message: 'Country not found' });
      }
      city.countryId = countryId;
    }

    city.name = name || city.name;
    await city.save();

    res.status(200).json({ code: 'CITY_UPDATED', message: 'City updated successfully', city });
  } catch (error) {
    console.error('Error updating city:', error);
    res.status(500).json({ code: 'UPDATE_CITY_FAILED', message: 'An error occurred while updating the city', error: error.message });
  }
};

// Delete a city by ID
export const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ code: 'CITY_NOT_FOUND', message: 'City not found' });
    }

    await city.destroy();
    res.status(200).json({ code: 'CITY_DELETED', message: 'City deleted successfully' });
  } catch (error) {
    console.error('Error deleting city:', error);
    res.status(500).json({ code: 'DELETE_CITY_FAILED', message: 'An error occurred while deleting the city', error: error.message });
  }
};

// Get all cities, including country name
export const getAllCities = async (_req, res) => {
  try {
    const cities = await City.findAll({
      include: [{ model: Country, attributes: ['name'] }],
      order: [['name', 'ASC']],
    });
    res.status(200).json({ code: 'CITIES_RETRIEVED', message: 'Cities retrieved successfully', cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ code: 'FETCH_CITIES_FAILED', message: 'An error occurred while fetching cities', error: error.message });
  }
};

// Search cities by name
export const searchCities = async (req, res) => {
  const { name } = req.query;

  try {
    const cities = await City.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: [{ model: Country, attributes: ['name'] }],
      order: [['name', 'ASC']],
    });

    if (cities.length === 0) {
      return res.status(404).json({ code: 'NO_CITIES_FOUND', message: 'No cities match the search criteria' });
    }

    res.status(200).json({ code: 'CITIES_SEARCHED', message: 'Cities search successful', cities });
  } catch (error) {
    console.error('Error searching cities:', error);
    res.status(500).json({ code: 'SEARCH_CITIES_FAILED', message: 'An error occurred while searching cities', error: error.message });
  }
};

// District
// Add a new district
export const addDistrict = async (req, res) => {
  const { name, cityId } = req.body;

  try {
    const city = await City.findByPk(cityId);
    if (!city) {
      return res.status(404).json({ code: 'CITY_NOT_FOUND', message: 'City not found' });
    }

    const district = await District.create({ name, cityId });
    res.status(201).json({ code: 'DISTRICT_ADDED', message: 'District added successfully', district });
  } catch (error) {
    console.error('Error adding district:', error);
    res.status(500).json({ code: 'ADD_DISTRICT_FAILED', message: 'An error occurred while adding the district', error: error.message });
  }
};

// Update an existing district
export const updateDistrict = async (req, res) => {
  const { id } = req.params;
  const { name, cityId } = req.body;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ code: 'DISTRICT_NOT_FOUND', message: 'District not found' });
    }

    // Validate the provided cityId if it exists
    if (cityId) {
      const city = await City.findByPk(cityId);
      if (!city) {
        return res.status(404).json({ code: 'CITY_NOT_FOUND', message: 'City not found' });
      }
      district.cityId = cityId;
    }

    district.name = name || district.name;
    await district.save();

    res.status(200).json({ code: 'DISTRICT_UPDATED', message: 'District updated successfully', district });
  } catch (error) {
    console.error('Error updating district:', error);
    res.status(500).json({ code: 'UPDATE_DISTRICT_FAILED', message: 'An error occurred while updating the district', error: error.message });
  }
};

// Delete a district by ID
export const deleteDistrict = async (req, res) => {
  const { id } = req.params;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ code: 'DISTRICT_NOT_FOUND', message: 'District not found' });
    }

    await district.destroy();
    res.status(200).json({ code: 'DISTRICT_DELETED', message: 'District deleted successfully' });
  } catch (error) {
    console.error('Error deleting district:', error);
    res.status(500).json({ code: 'DELETE_DISTRICT_FAILED', message: 'An error occurred while deleting the district', error: error.message });
  }
};

// Get all districts, including the associated city name
export const getAllDistricts = async (_req, res) => {
  try {
    const districts = await District.findAll({
      include: [{ model: City, attributes: ['name'] }],
      order: [['name', 'ASC']],
    });
    res.status(200).json({ code: 'DISTRICTS_RETRIEVED', message: 'Districts retrieved successfully', districts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ code: 'FETCH_DISTRICTS_FAILED', message: 'An error occurred while fetching districts', error: error.message });
  }
};

// Search districts by name
export const searchDistricts = async (req, res) => {
  const { name } = req.query;

  try {
    const districts = await District.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: [{ model: City, attributes: ['name'] }],
      order: [['name', 'ASC']],
    });

    if (districts.length === 0) {
      return res.status(404).json({ code: 'NO_DISTRICTS_FOUND', message: 'No districts match the search criteria' });
    }

    res.status(200).json({ code: 'DISTRICTS_SEARCHED', message: 'Districts search successful', districts });
  } catch (error) {
    console.error('Error searching districts:', error);
    res.status(500).json({ code: 'SEARCH_DISTRICTS_FAILED', message: 'An error occurred while searching districts', error: error.message });
  }
};