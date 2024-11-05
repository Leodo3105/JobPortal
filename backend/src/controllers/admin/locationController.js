import Country from '../../models/country.js';
import City from '../../models/city.js';
import District from '../../models/district.js';
import { Op } from 'sequelize'; // Để hỗ trợ cho tìm kiếm với iLike

// Country
export const addCountry = async (req, res) => {
  const { name } = req.body;

  try {
    const existingCountry = await Country.findOne({ where: { name } });
    if (existingCountry) {
      return res.status(400).json({ message: 'Country already exists' });
    }

    const country = await Country.create({ name });
    res.status(201).json({ message: 'Country added successfully', country });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    country.name = name || country.name;
    await country.save();

    res.status(200).json({ message: 'Country updated successfully', country });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    await country.destroy();
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const getAllCountries = async (_req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const searchCountries = async (req, res) => {
  const { name } = req.query;

  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// City
export const addCity = async (req, res) => {
  const { name, countryId } = req.body;

  try {
    const country = await Country.findByPk(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const city = await City.create({ name, countryId });
    res.status(201).json({ message: 'City added successfully', city });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name, countryId } = req.body;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    if (countryId) {
      const country = await Country.findByPk(countryId);
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
      city.countryId = countryId;
    }

    city.name = name || city.name;
    await city.save();

    res.status(200).json({ message: 'City updated successfully', city });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    await city.destroy();
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const getAllCities = async (_req, res) => {
  try {
    const cities = await City.findAll({
      include: [{ model: Country, attributes: ['name'] }],
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const searchCities = async (req, res) => {
  const { name } = req.query;

  try {
    const cities = await City.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [{ model: Country, attributes: ['name'] }]
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// District
export const addDistrict = async (req, res) => {
  const { name, cityId } = req.body;

  try {
    const city = await City.findByPk(cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const district = await District.create({ name, cityId });
    res.status(201).json({ message: 'District added successfully', district });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const updateDistrict = async (req, res) => {
  const { id } = req.params;
  const { name, cityId } = req.body;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ message: 'District not found' });
    }

    if (cityId) {
      const city = await City.findByPk(cityId);
      if (!city) {
        return res.status(404).json({ message: 'City not found' });
      }
      district.cityId = cityId;
    }

    district.name = name || district.name;
    await district.save();

    res.status(200).json({ message: 'District updated successfully', district });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const deleteDistrict = async (req, res) => {
  const { id } = req.params;

  try {
    const district = await District.findByPk(id);
    if (!district) {
      return res.status(404).json({ message: 'District not found' });
    }

    await district.destroy();
    res.status(200).json({ message: 'District deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const getAllDistricts = async (_req, res) => {
  try {
    const districts = await District.findAll({
      include: [{ model: City, attributes: ['name'] }],
    });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

export const searchDistricts = async (req, res) => {
  const { name } = req.query;

  try {
    const districts = await District.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [{ model: City, attributes: ['name'] }]
    });
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};
