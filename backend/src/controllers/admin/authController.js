import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import ApplicantProfiles from '../../models/applicant_profile.js';
import EmployerProfiles from '../../models/employer_profile.js';
import dotenv from 'dotenv';
import sequelize from '../../config/db.js';

dotenv.config();

// Đăng ký người dùng
export const register = async (req, res) => {
  const { email, password, role } = req.body;

  const transaction = await sequelize.transaction();

  try {
    // Kiểm tra email trùng lặp
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Gán vai trò mặc định là 'applicant' nếu role không được cung cấp
    const userRole = role || 'applicant';

    // Kiểm tra vai trò hợp lệ
    const validRoles = ['applicant', 'employer'];
    if (!validRoles.includes(userRole)) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Kiểm tra độ phức tạp của mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      await transaction.rollback();
      return res.status(400).json({
        message:
          'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await hash(password, 10);

    // Tạo tài khoản mới
    const newUser = await User.create(
      {
        email,
        password: hashedPassword,
        role: userRole,
        isLocked: false,
      },
      { transaction }
    );

    // Tạo hồ sơ dựa trên vai trò
    let applicantProfile = null;
    let employerProfile = null;

    if (newUser.role === 'applicant') {
      applicantProfile = await ApplicantProfiles.create(
        {
          user_id: newUser.id,
          email: newUser.email,
        },
        { transaction }
      );
    } else if (newUser.role === 'employer') {
      employerProfile = await EmployerProfiles.create(
        {
          user_id: newUser.id,
          email: newUser.email,
        },
        { transaction }
      );
    }

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        applicant_profile_id: applicantProfile ? applicantProfile.id : null,
      },
    });
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await transaction.rollback();
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred during registration', error });
  }
};

// Đăng nhập người dùng
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra email tồn tại
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Kiểm tra tài khoản bị khóa
    if (user.isLocked) {
      return res.status(403).json({ message: 'Account is locked' });
    }

    // Nếu user là applicant, lấy applicant_profile_id
    let applicantProfileId = null;
    if (user.role === 'applicant') {
      const applicantProfile = await ApplicantProfiles.findOne({ where: { user_id: user.id } });
      applicantProfileId = applicantProfile ? applicantProfile.id : null;
    }

    // Tạo token JWT với applicant_profile_id (nếu có)
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        applicant_profile_id: applicantProfileId, // Thêm applicant_profile_id vào payload
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login', error });
  }
};

// Khóa tài khoản người dùng
export const lockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isLocked = true;
    await user.save();

    res.status(200).json({ message: 'User account locked successfully' });
  } catch (error) {
    console.error('Error locking user:', error);
    res.status(500).json({ message: 'An error occurred while locking the user', error });
  }
};

// Mở khóa tài khoản người dùng
export const unlockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isLocked = false;
    await user.save();

    res.status(200).json({ message: 'User account unlocked successfully' });
  } catch (error) {
    console.error('Error unlocking user:', error);
    res.status(500).json({ message: 'An error occurred while unlocking the user', error });
  }
};
