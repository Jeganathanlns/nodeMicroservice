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

  async createUser(userData) {
    const { firstname, lastname, email, password, otp, createdBy } = userData;
    
    const isOTPValid = await this.validateOTP(email, otp);
    if (!isOTPValid) {
      throw new Error('Invalid or expired OTP');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      createdBy: createdBy || 'system'
    });

    return { id: user.id, firstname, lastname, email, createdBy: user.createdBy, createdAt: user.createdAt };
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
}

module.exports = new UserService();