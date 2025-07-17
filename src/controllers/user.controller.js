const userService = require('../services/user.service');
const { generateToken } = require('../utils/jwt.utils');
const bcrypt = require('bcrypt');

exports.generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await userService.generateOTP(email);
    res.json({ message: 'OTP sent', otp }); // In production, send via email/SMS
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await userService.verifyOTP(email, otp);
    res.status(201).json({ 
      verified: true, 
      message: 'OTP verified and registration completed successfully',
      user: result.user
    });
  } catch (error) {
    res.status(400).json({ verified: false, error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(200).json({ message: 'Registration initiated', ...result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token with user id and email
    const token = generateToken({
      id: user.id,
      email: user.email
    });
    
    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};