const { Industry } = require('../../models');

// Thêm ngành nghề mới
const addIndustry = async (req, res) => {
  const { name } = req.body;
  
  try {
    const existingIndustry = await Industry.findOne({ where: { name } });
    if (existingIndustry) {
      return res.status(400).json({ message: 'Industry already exists' });
    }

    const industry = await Industry.create({ name });
    res.status(201).json({ message: 'Industry added successfully', industry });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Cập nhật tên ngành nghề
const updateIndustry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }

    industry.name = name || industry.name;
    await industry.save();

    res.status(200).json({ message: 'Industry updated successfully', industry });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Xóa ngành nghề
const deleteIndustry = async (req, res) => {
  const { id } = req.params;

  try {
    const industry = await Industry.findByPk(id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }

    await industry.destroy();
    res.status(200).json({ message: 'Industry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Lấy danh sách tất cả ngành nghề
const getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.findAll();
    res.status(200).json(industries);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = { addIndustry, updateIndustry, deleteIndustry, getAllIndustries };
