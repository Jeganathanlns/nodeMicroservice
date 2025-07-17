const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const { client: redis, isConnected } = require('../dbConfig/redis.config');

// Memory fallback for OTP storage
const memoryOTP = new Map();

class UserService {
  async generateOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOTP = await bcrypt.hash(otp.toString(), 10);
    
    if (isConnected()) {
      await redis.setEx(`otp:${email}`, 300, hashedOTP);
    } else {
      memoryOTP.set(email, { hash: hashedOTP, expires: Date.now() + 300000 });
    }
    return otp;
  }

  async validateOTP(email, otp) {
    let hashedOTP;
    
    if (isConnected()) {
      hashedOTP = await redis.get(`otp:${email}`);
    } else {
      const stored = memoryOTP.get(email);
      if (stored && stored.expires > Date.now()) {
        hashedOTP = stored.hash;
      }
    }
    
    if (!hashedOTP) return false;
    
    const isValid = await bcrypt.compare(otp.toString(), hashedOTP);
    if (isValid) {
      if (isConnected()) {
        await redis.del(`otp:${email}`);
      } else {
        memoryOTP.delete(email);
      }
    }
    return isValid;
  }

  async verifyOTP(email, otp) {
    const isOTPValid = await this.validateOTP(email, otp);
    if (!isOTPValid) {
      throw new Error('Invalid or expired OTP');
    }
    
    // Get registration data from Redis
    let registrationData;
    if (isConnected()) {
      const data = await redis.get(`registration:${email}`);
      if (!data) {
        throw new Error('Registration data not found or expired');
      }
      registrationData = JSON.parse(data);
    } else {
      const stored = memoryOTP.get(`registration:${email}`);
      if (!stored || stored.expires <= Date.now()) {
        throw new Error('Registration data not found or expired');
      }
      registrationData = JSON.parse(stored.value);
    }
    
    // Create user in MySQL
    const user = await User.create({
      firstname: registrationData.firstname,
      lastname: registrationData.lastname,
      email: registrationData.email,
      password: registrationData.password, // Already hashed
      createdBy: registrationData.createdBy || 'system'
    });
    
    // Clean up Redis data
    if (isConnected()) {
      await redis.del(`registration:${email}`);
    } else {
      memoryOTP.delete(`registration:${email}`);
    }
    
    return { 
      verified: true,
      user: {
        id: user.id, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        email: user.email, 
        createdBy: user.createdBy, 
        createdAt: user.createdAt
      }
    };
  }
  
  async registerUser(userData) {
    const { email } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    
    // Store registration data in Redis
    const registrationData = JSON.stringify(userData);
    if (isConnected()) {
      await redis.setEx(`registration:${email}`, 3600, registrationData); // 1 hour expiry
    } else {
      memoryOTP.set(`registration:${email}`, { value: registrationData, expires: Date.now() + 3600000 });
    }
    
    // Generate OTP for verification
    const otp = await this.generateOTP(email);
    
    return { 
      email, 
      firstname: userData.firstname,
      lastname: userData.lastname,
      status: 'pending',
      otp: otp // Include OTP in the response
    };
  }

  async getAllUsers() {
    return await User.findAll({
      attributes: ['id', 'firstname', 'lastname', 'email', 'createdBy', 'createdAt']
    });
  }

  async getUserById(id) {
    return await User.findByPk(id, {
      attributes: ['id', 'firstname', 'lastname', 'email', 'createdBy', 'createdAt']
    });
  }

  async updateUser(id, userData) {
    const { firstname, lastname, email } = userData;
    
    await User.update(
      { firstname, lastname, email },
      { where: { id } }
    );
    
    return await this.getUserById(id);
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
  
  async findByEmail(email) {
    return await User.findOne({
      where: { email },
      attributes: ['id', 'firstname', 'lastname', 'email', 'password', 'createdBy', 'createdAt']
    });
  }
}

module.exports = new UserService();