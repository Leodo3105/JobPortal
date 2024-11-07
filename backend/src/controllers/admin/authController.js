import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import ApplicantProfiles from '../../models/applicant_profile.js';
import EmployerProfiles from '../../models/employer_profile.js'; // 
import dotenv from 'dotenv';
import sequelize  from '../../config/db.js';

dotenv.config();

// Đăng ký người dùng 
export const register = async (req, res) => {
  const { email, password, role } = req.body;

  // Bắt đầu transaction
  const transaction = await sequelize.transaction();

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo tài khoản mới
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || 'applicant',
      isLocked: false,
    }, { transaction });

    // Kiểm tra vai trò và tạo bản ghi applicant_profiles nếu là applicant
    if (newUser.role === 'applicant') {
      await ApplicantProfiles.create({
        user_id: newUser.id, // Sử dụng newUser.id làm userId
        email: newUser.email
      }, { transaction });
    }

    if (newUser.role === 'employer') {
      await EmployerProfiles.create({
        user_id: newUser.id,
        email: newUser.email
      }, { transaction });
    }

    // Commit transaction
    await transaction.commit();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await transaction.rollback();
    res.status(500).json({ message: 'An error occurred', error });
  }
};


// Đăng nhập người dùng
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await compare(password, user.password);
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
export const lockUser = async (req, res) => {
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
export const unlockUser = async (req, res) => {
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
