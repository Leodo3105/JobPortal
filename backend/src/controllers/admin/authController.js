const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv').config();

// Đăng ký người dùng mới
const register = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      isLocked: false
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.isLocked) {
      return res.status(403).json({ message: 'Account is locked' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Khóa tài khoản người dùng
const lockUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isLocked = true;
      await user.save();
  
      res.status(200).json({ message: 'User account locked successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
};
  
// Mở khóa tài khoản người dùng
const unlockUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isLocked = false;
      await user.save();
  
      res.status(200).json({ message: 'User account unlocked successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = { register, login, lockUser, unlockUser };

